import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function getRoutes(args) {
	try {
		const nearestSpot = await prisma.$queryRaw`
				    SELECT "Name",
				    ST_Distance(
				      ST_SetSRID(ST_MakePoint(${args.Long}, ${args.Lat}), 4326),
				      ST_SetSRID(ST_MakePoint("Long", "Lat"), 4326)
				    ) as distance
				    FROM "Stoppage"
				    ORDER BY distance
				    LIMIT 1;
				  `;

		let data = [];

		for (let item of nearestSpot) {
			const routes =
				await prisma.$queryRaw`SELECT "Shuttle_id","Starting" , "Destination" ,"Start_time" FROM "Shuttle" WHERE "Starting"=${item.Name}`;

			data.push(...routes);
		}

		
		return data;
	} catch (error) {
		throw new Error(error.message);
	} finally {
		await prisma.$disconnect();
	}
}
