import ShuttleBooking from "../Schema/Booking_Schema.js";

import { PrismaClient } from "@prisma/client";

import ShuttleDriver from "../Schema/Shuttle_driver_schema.js";

const prisma = new PrismaClient();

function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export async function bookShuttle(data) {
	try {
		const { uid, sid, day, pick, drop } = data;

		const shuttle = await prisma.shuttle.findUnique({
			where: {
				Shuttle_id: sid,
			},
		});

		const route = sid.substr(0, 2);

		const isAssigned = await ShuttleDriver.findOne({
			Route: route,
			Shuttle_id: sid,
		});
	} catch (error) {
		console.log(error.messgage);
	} finally {
		await prisma.$disconnect();
	}
}
