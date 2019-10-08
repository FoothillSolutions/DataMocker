import ObjectMocker from "./ObjectMocker";
import R365Faker from "./extendedFaker";

export type Newable<T, Q> = { new (...args: ObjectMocker<Q>[]): T };

export default class Lister<T> {
	protected UUIDsequencer = R365Faker.uniqueUUID();
	protected items: T[] = [];
	protected mocker: Newable<ObjectMocker<T>, T>;

	constructor(mocker?: Newable<ObjectMocker<T>, T>) {
		this.mocker = mocker;
	}

	public withItem(item: T) {
		this.items.push(item);
		return this;
	}
	public withItems(items: T[]) {
		this.items = [...this.items, ...items];
		return this;
	}

	public withData(modifyCallBack?: (item: T, index: number) => Partial<T>) {
		const items: T[] = this.items.reduce<T[]>((acc, item, index) => {
			const partialModifiedItem = modifyCallBack(item, index) || {};
			acc.push({ ...item, ...partialModifiedItem });
			return acc;
		}, []);
		this.items = items;
		return this;
	}

	public generate(length: number): Lister<T> {
		for (let i = 0; i < length; i++) {
			const item = new this.mocker().build();
			this.items.push(item);
		}
		return this;
	}

	public withRule(prop: keyof T, rule: (item: T, index: number) => T[keyof T]): Lister<T> {
		this.items = this.items.map((item, index) => ({
			...item,
			[prop]: rule(item, index),
		}));
		return this;
	}

	//if index is given return the item at that index, if not return all items
	public get(index: number) {
		return Object.assign({}, this.items[index]);
	}

	public build(): T[] {
		return this.items;
	}
}
