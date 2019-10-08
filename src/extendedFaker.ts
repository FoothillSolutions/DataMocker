import * as faker from "faker";

const range = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) + min);
};

//sequencer to create sequence to be used in furture as ids in testing
const sequence = (start = 0) => {
	let startNumber = start;
	return {
		next: () => {
			return startNumber++;
		},
	};
};

const uniqueUUID = () => {
	const uuids = {};
	return {
		next: () => {
			let uuid = faker.random.uuid();

			//get unique uuid
			while (uuids[uuid]) uuid = faker.random.uuid();

			// store the new uuid
			uuids[uuid] = uuid;
			return uuid;
		},
	};
};

// extended faker.js functionality
const R365Faker = {
	...faker,
	random: {
		...faker.random,
		range,
	},
	sequence,
	uniqueUUID,
};

export default R365Faker;
