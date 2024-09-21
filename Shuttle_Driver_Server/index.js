import express from "express";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import mongoose from "mongoose";
import cors from "cors";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { mergeResolvers } from "@graphql-tools/merge";
import driverType from "./Schemas/drivertypedef.js";
import driverResolver from "./Resolvers/Driver.resolver.js";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServer } from "@apollo/server";
import verifyToken from "./Middleware/Verify.js";

const app = express();
dotenv.config();

const options = {
	origin: "http://localhost:4000",
	credentials: true,
};
app.use(cors(options));

app.use(express.json());

app.use(verifyToken);

const url = process.env.URI;
const PORT = process.env.PORT || 9000;

async function connectDB() {
	const client = new MongoClient(url);
	await client.connect();
	await mongoose.connect(url);
}

connectDB()
	.then(() => {
		console.log("Database connected");
	})
	.catch(() => {
		console.log("Database connection failed");
	});

const typeDefs = mergeTypeDefs([driverType]);

const resolvers = mergeResolvers([driverResolver]);

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

await server.start();
app.use(
	"/graphql",
	expressMiddleware(server, {
		context: async ({ req, res }) => ({ req, res }),
	})
);

app.get("/", (req, res) => {
	res.send("Hello, World!");
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
