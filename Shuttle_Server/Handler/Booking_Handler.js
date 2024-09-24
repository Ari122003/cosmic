import ShuttleBooking from "../Schema/Booking_Schema.js";
import ShuttleDriver from "../Schema/Shuttle_driver_schema.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomString(length = 20) {
	const characters =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;

	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	return result;
}

export async function bookShuttle(data) {
	try {
		const { uid, sid, date, pick, drop } = data;

		const route = sid.substr(0, 2);

		const isAssigned = await ShuttleDriver.findOne({
			Shuttle_ID: sid,
		});

		if (!isAssigned) {
			const drivers_of_given_route = await ShuttleDriver.find({
				Route: route,
				Shuttle_ID: null,
			});

			let newDriver;
			if (drivers_of_given_route.length == 1) {
				newDriver = drivers_of_given_route[0];
			} else {
				const index = getRandomInt(0, drivers_of_given_route.length - 1);
				newDriver = drivers_of_given_route[index];
			}

			await ShuttleDriver.findOneAndUpdate(
				{ UID: newDriver.UID },
				{ Shuttle_ID: sid }
			);
		}

		const assignedDriver = await ShuttleDriver.findOne({ Shuttle_ID: sid });

		const [{ Seat }] =
			await prisma.$queryRaw`SELECT "Seat" FROM "Shuttle" WHERE "Shuttle_id"=${sid}`;

		if (Seat == 0) {
			throw new Error("No Seats available in the Shuttle");
		}

		const updatedRow = await prisma.shuttle.update({
			where: { Shuttle_id: sid },
			data: {
				Seat: Seat - 1,
			},
		});

		const newBooking = new ShuttleBooking({
			Booking_id: generateRandomString(),
			Shuttle_id: sid,
			User_id: uid,
			Driver_id: assignedDriver.UID,
			Date: date,
			PickUp: pick,
			Drop: drop,
		});

		await newBooking.save();

		return "Booking successful";
	} catch (error) {
		throw new Error(error.messgage);
	} finally {
		+(await prisma.$disconnect());
	}
}
