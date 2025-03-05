import {
	Abortable,
	AggregateOptions,
	AggregationCursor,
	DeleteOptions,
	Document,
	Filter,
	OptionalUnlessRequiredId,
} from "mongodb"

export interface IMongoRepository<T extends Document> {
	insertOne(item: OptionalUnlessRequiredId<T>): Promise<void>
	countDocument(f: Filter<T>): Promise<number>
	deleteMany(f: Filter<T>, o?: DeleteOptions): Promise<void>
}
