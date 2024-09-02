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

async function main() {
	const args = {
		Start: "Danes Sheikh Lane",
		Dest: "New Town",
		CurrentTime: "3:30 PM",
	};

	// Step 1: Fetch the Stopage IDs for Start and Dest in one query
	const [startStopage, destStopage] = await prisma.$queryRaw`
SELECT "Stopage_id", "Name" 
FROM "Stoppage" 
WHERE "Name" IN (${args.Start}, ${args.Dest})
`;

	const stopageid1 = startStopage.Stopage_id;
	const stopageid2 = destStopage.Stopage_id;

	// Step 2: Find all shuttles that pass through both Start and Dest
	const shuttleIds = await prisma.$queryRaw`
SELECT DISTINCT "Shuttle_id" 
FROM "Map"
WHERE "Stopage_id" IN (${stopageid1}, ${stopageid2})
GROUP BY "Shuttle_id"
HAVING COUNT(DISTINCT "Stopage_id") = 2
`;

	// Step 3: Fetch coordinates for Start once
	const startCoor = await prisma.$queryRaw`
SELECT "Lat", "Long" 
FROM "Stoppage" 
WHERE "Stopage_id" = ${stopageid1}
`;

	// Step 4: Fetch shuttle details and distances in one go
	const finalData = await Promise.all(
		shuttleIds.map(async ({ Shuttle_id }) => {
			const [shuttle, startStop, destStop, mapData] = await prisma.$transaction(
				[
					prisma.$queryRaw`
			  SELECT "Starting", "Destination" 
			  FROM "Shuttle" 
			  WHERE "Shuttle_id" = ${Shuttle_id}`,
					prisma.$queryRaw`
			  SELECT "Lat", "Long" 
			  FROM "Stoppage" 
			  WHERE "Name" = (SELECT "Starting" FROM "Shuttle" WHERE "Shuttle_id" = ${Shuttle_id})`,
					prisma.$queryRaw`
			  SELECT "Lat", "Long" 
			  FROM "Stoppage" 
			  WHERE "Name" = (SELECT "Destination" FROM "Shuttle" WHERE "Shuttle_id" = ${Shuttle_id})`,
					prisma.$queryRaw`
			  SELECT "Stopage_id", "Time" 
			  FROM "Map" 
			  WHERE "Shuttle_id" = ${Shuttle_id} AND "Stopage_id" IN (${stopageid1}, ${stopageid2})`,
				]
			);

			// Ensure mapData contains the required stopages
			const stopage1Data = mapData.find((m) => m.Stopage_id === stopageid1);
			const stopage2Data = mapData.find((m) => m.Stopage_id === stopageid2);

			if (!stopage1Data || !stopage2Data) {
				// Skip this shuttle if any of the required stopage data is missing
				return null;
			}

			const distFromStart = calculateDistance(
				startCoor[0].Lat,
				startCoor[0].Long,
				startStop[0].Lat,
				startStop[0].Long
			);
			const distFromDest = calculateDistance(
				startCoor[0].Lat,
				startCoor[0].Long,
				destStop[0].Lat,
				destStop[0].Long
			);

			if (distFromStart < distFromDest) {
				const startingTimeInMinutes = timeToMinutes(stopage1Data.Time);
				const currentTimeInMinutes = timeToMinutes(args.Time);

				if (startingTimeInMinutes >= currentTimeInMinutes) {
					const shuttleDetails = await prisma.$queryRaw`
				SELECT * 
				FROM "Shuttle" 
				WHERE "Shuttle_id" = ${Shuttle_id}`;

					shuttleDetails[0].PickupTime = stopage1Data.Time;
					shuttleDetails[0].DropTime = stopage2Data.Time;

					return shuttleDetails[0];
				}
			}
			return null;
		})
	);

	// Filter out null values
	const filteredFinalData = finalData.filter((shuttle) => shuttle !== null);
	console.log(filteredFinalData);
}

//
main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
