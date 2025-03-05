import {
	Abortable,
	AggregateOptions,
	AggregationCursor,
	Db,
	Document,
	Filter,
} from "mongodb"
import { IMongoRepository } from "./IMongoRepository"
import { MongoRepository } from "./MongoRepository"

export interface Swipe {
	_id?: string
	type: "swipe-liked" | "swipe-disliked"
	uid: string
}

export class SwipeRepository {
	private repository: IMongoRepository<Swipe>

	constructor(db: Db) {
		this.repository = new MongoRepository<Swipe>(db, "swipes")
	}

	async aggregateSwipe(
		pipeline: Document[],
		options: AggregateOptions & Abortable
	): Promise<AggregationCursor<Swipe>> {
		return this.repository.aggregate(pipeline, options)
	}

	async createSwipe(s: Swipe): Promise<void> {
		await this.repository.insertOne(s)
	}

	async deleteSwipes(f: Filter<Swipe>): Promise<void> {
		await this.repository.deleteMany(f)
	}
}
