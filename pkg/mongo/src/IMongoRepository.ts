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
	aggregate(
		p: Document[],
		o: AggregateOptions & Abortable
	): Promise<AggregationCursor<T>>
	deleteMany(f: Filter<T>, o?: DeleteOptions): Promise<void>
}
