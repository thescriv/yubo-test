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
	liked: boolean
	user_id: string
	target_id: string
}

export class SwipeRepository {
	private repository: IMongoRepository<Swipe>

	constructor(db: Db) {
		this.repository = new MongoRepository<Swipe>(db, "swipes")
	}

	async countLike(s: Swipe | Partial<Swipe>): Promise<number> {
		const f: Filter<Swipe> = { user_id: s.user_id, liked: true }

		return this.repository.countDocument(f)
	}

	async countDislike(s: Swipe | Partial<Swipe>): Promise<number> {
		const f: Filter<Swipe> = { user_id: s.user_id, liked: false }

		return this.repository.countDocument(f)
	}

	async createSwipe(s: Swipe): Promise<void> {
		await this.repository.insertOne(s)
	}

	async delete(s: Swipe | Partial<Swipe>): Promise<void> {
		const f: Filter<Swipe> = { user_id: s.user_id}

		await this.repository.deleteMany(f)
	}
}
