const Hotel = require('../../enterprise_business_rules/model/hotel.model');
const Client = require('../../enterprise_business_rules/model/client.model');
const Period = require('../../enterprise_business_rules/model/period.model');
const Plan = require('../../enterprise_business_rules/model/plan.model');
const CLIENT_TYPES = require('../../enterprise_business_rules/enum/client-types.enum');
const PERIOD_TYPES = require('../../enterprise_business_rules/enum/period-types.enum');

const lakewood = new Hotel({
	id: 1,
	name: 'Lakewood',
	classification: 3,
});

const bridgewood = new Hotel({
	id: 2,
	name: 'Bridgewood',
	classification: 4,
});

const ridgewood = new Hotel({
	id: 3,
	name: 'Ridgewood',
	classification: 5,
});

const regular = new Client({
	id: 1,
	description: CLIENT_TYPES.REGULAR,
});

const reward = new Client({
	id: 2,
	description: CLIENT_TYPES.REWARD,
});

const week = new Period({
	id: 1,
	description: PERIOD_TYPES.WEEK,
});

const weekend = new Period({
	id: 2,
	description: PERIOD_TYPES.WEEKEND,
});

const plans = [
	new Plan({
		id: 1,
		hotel: lakewood,
		client: regular,
		period: week,
		price: 110,
	}),
	new Plan({
		id: 2,
		hotel: lakewood,
		client: reward,
		period: week,
		price: 80,
	}),
	new Plan({
		id: 3,
		hotel: lakewood,
		client: regular,
		period: weekend,
		price: 90,
	}),
	new Plan({
		id: 4,
		hotel: lakewood,
		client: reward,
		period: weekend,
		price: 80,
	}),
	new Plan({
		id: 5,
		hotel: bridgewood,
		client: regular,
		period: week,
		price: 160,
	}),
	new Plan({
		id: 6,
		hotel: bridgewood,
		client: reward,
		period: week,
		price: 110,
	}),
	new Plan({
		id: 7,
		hotel: bridgewood,
		client: regular,
		period: weekend,
		price: 60,
	}),
	new Plan({
		id: 8,
		hotel: bridgewood,
		client: reward,
		period: weekend,
		price: 50,
	}),
	new Plan({
		id: 9,
		hotel: ridgewood,
		client: regular,
		period: week,
		price: 220,
	}),
	new Plan({
		id: 10,
		hotel: ridgewood,
		client: reward,
		period: week,
		price: 100,
	}),
	new Plan({
		id: 11,
		hotel: ridgewood,
		client: regular,
		period: weekend,
		price: 150,
	}),
	new Plan({
		id: 12,
		hotel: ridgewood,
		client: reward,
		period: weekend,
		price: 40,
	}),
];

const tiedPlans = [
	new Plan({
		id: 1,
		hotel: lakewood,
		client: regular,
		period: week,
		price: 100,
	}),
	new Plan({
		id: 2,
		hotel: bridgewood,
		client: regular,
		period: week,
		price: 100,
	}),
	new Plan({
		id: 3,
		hotel: ridgewood,
		client: regular,
		period: week,
		price: 100,
	}),
	new Plan({
		id: 4,
		hotel: ridgewood,
		client: regular,
		period: week,
		price: 120,
	}),
];

module.exports = {
	lakewood,
	bridgewood,
	ridgewood,
	regular,
	reward,
	week,
	weekend,
	plans,
	tiedPlans,
};
