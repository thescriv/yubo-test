import {
	Collection,
	Db,
	Document,
	OptionalUnlessRequiredId,
	Filter,
	DeleteOptions,
	InsertOneOptions,
} from "mongodb"

import { IMongoRepository } from "./IMongoRepository"

export class MongoRepository<T extends Document>
	implements IMongoRepository<T>
{
	private collection: Collection<T>

	constructor(db: Db, collectionName: string) {
		this.collection = db.collection<T>(collectionName)
	}

	async insertOne(
		item: OptionalUnlessRequiredId<T>,
	): Promise<void> {
		await this.collection.insertOne(item)
	}

	async countDocument(f: Filter<T>): Promise<number> {
		return this.collection.countDocuments(f)
	}

	async deleteMany(f: Filter<T>, o?: DeleteOptions): Promise<void> {
		await this.collection.deleteMany(f, o)
	}
}
