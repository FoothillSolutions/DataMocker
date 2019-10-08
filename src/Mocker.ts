export default abstract class Mocker<T> {
	//should be implemented by dev so it return the default object of a certain mocked-object
	abstract create(): T;
	//this thing is imperative, we'll need to eliminate it, or not use it at all
	abstract withData(cb: (obj: T) => Partial<T>): Mocker<T>;

	abstract build(): T;
}
