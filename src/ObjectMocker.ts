import R365Faker from "./extendedFaker";

export default abstract class ObjectMocker<T> {
	protected UUIDsequencer = R365Faker.uniqueUUID();
	protected item: T;

	public abstract create(): T;

	constructor() {
		this.item = this.create();
	}

	public withData(partialModifiedItem: Partial<T>) {
		this.item = { ...this.item, ...partialModifiedItem };
		return this;
	}

	public build: () => T = () => {
		return this.item;
	};

	public withRule: (prop: keyof T, rule: (item: T) => T[keyof T]) => ObjectMocker<T> = (prop, rule) => {
		this.item[prop] = rule(this.item);
		return this;
	};
}
