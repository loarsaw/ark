import { MongoClient, Db } from "mongodb";
import "dotenv/config";

let client: MongoClient | null = null;
let db: Db | null = null;

export async function getMongoDBInstance(): Promise<Db> {
    if (db) return db;

    const uri = process.env.MONGO_CONNECTION_STRING || "mongodb://mongo-main:27017";
    const dbName = process.env.DB_NAME || "task";

    if (!client) {
        client = new MongoClient(uri);
        await client.connect();
    }

    db = client.db(dbName);
    return db;
}

export async function closeMongoDBConnection(): Promise<void> {
    if (client) {
        await client.close();
        client = null;
        db = null;
    }
}
