import {
	Collection,
	Db,
	Document,
	OptionalUnlessRequiredId,
	AggregateOptions,
	Abortable,
	AggregationCursor,
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

	async insertOne(item: OptionalUnlessRequiredId<T>, o?: InsertOneOptions): Promise<void> {
		await this.collection.insertOne(item, o)
	}

	async aggregate(
		p: Document[],
		o: AggregateOptions & Abortable
	): Promise<AggregationCursor<T>> {
		return this.collection.aggregate(p, o)
	}

	async deleteMany(f: Filter<T>, o?: DeleteOptions): Promise<void> {
		await this.collection.deleteMany(f, o)
	}
}
