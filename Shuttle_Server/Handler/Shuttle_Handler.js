import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function timeToMinutes(timeStr) {
	if (!timeStr) return 0;

	const normalizedTimeStr = timeStr.replace(".", ":").toUpperCase();

	const [time, modifier] = normalizedTimeStr.split(" ");

	const [hoursStr, minutesStr] = time.split(":");
	let hours = parseInt(hoursStr, 10);
	let minutes = parseInt(minutesStr, 10);

	if (isNaN(hours) || isNaN(minutes)) {
		return 0;
	}

	if (modifier === "PM" && hours !== 12) hours += 12;
	if (modifier === "AM" && hours === 12) hours = 0;

	return hours * 60 + minutes;
}

function calculateDistance(lat1, long1, lat2, long2) {
	const R = 6371e3;
	const φ1 = (lat1 * Math.PI) / 180;
	const φ2 = (lat2 * Math.PI) / 180;
	const Δφ = ((lat2 - lat1) * Math.PI) / 180;
	const Δλ = ((long2 - long1) * Math.PI) / 180;

	const x =
		Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
		Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
	const cc = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

	const d = R * cc;

	return d;
}

export async function shuttleHandler(args) {
	try {
		const result = await prisma.$queryRaw`
  				SELECT "Stopage_id", "Name" 
  				FROM "Stoppage" 
  				WHERE "Name" = ${args.start} OR "Name" = ${args.dest}
				`;

		let startID, destID;

		result.forEach((row) => {
			if (row.Name === args.start) {
				startID = row.Stopage_id;
			} else if (row.Name === args.dest) {
				destID = row.Stopage_id;
			}
		});

		const Shuttles = await prisma.$queryRaw`
					  SELECT DISTINCT "Shuttle_id"
						FROM "Map"
				        WHERE "Stopage_id" IN (${startID}, ${destID})
						GROUP BY "Shuttle_id"
					`;

		const finalData = [];

		for (let item of Shuttles) {
			const [{ Time }] =
				await prisma.$queryRaw`SELECT "Time" FROM "Map" WHERE "Shuttle_id"=${item.Shuttle_id} AND "Stopage_id"=${startID}`;

			if (timeToMinutes(Time) > timeToMinutes(args.time)) {
				const shuttleDetails =
					await prisma.$queryRaw`SELECT * FROM "Shuttle" WHERE  "Shuttle_id" = ${item.Shuttle_id}`;
				const startCoor =
					await prisma.$queryRaw`SELECT "Lat", "Long" FROM "Stoppage" WHERE "Name" = ${shuttleDetails[0].Starting}`;
				const destCoor =
					await prisma.$queryRaw`SELECT "Lat", "Long" FROM "Stoppage" WHERE "Name" = ${shuttleDetails[0].Destination}`;
				const userCoor =
					await prisma.$queryRaw`SELECT "Lat", "Long" FROM "Stoppage" WHERE "Stopage_id" = ${startID}`;

				if (
					calculateDistance(
						startCoor[0].Lat,
						startCoor[0].Long,
						userCoor[0].Lat,
						userCoor[0].Long
					) <
					calculateDistance(
						destCoor[0].Lat,
						destCoor[0].Long,
						userCoor[0].Lat,
						userCoor[0].Long
					)
				) {
					const droptime =
						await prisma.$queryRaw`SELECT "Time" FROM "Map" WHERE "Shuttle_id"=${item.Shuttle_id} AND "Stopage_id"=${destID}`;

					const data = {
						...shuttleDetails[0],
						PickupTime: Time,
						DropTime: droptime[0].Time,
					};


					finalData.push(data);
				}
			}
		}

		return finalData;
	} catch (error) {
		throw new Error(error.message);
	} finally {
		await prisma.$disconnect();
	}
}
