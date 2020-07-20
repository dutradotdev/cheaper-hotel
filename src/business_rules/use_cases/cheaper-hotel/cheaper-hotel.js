const { plans } = require('../../../frameworks_drivers/database/db');
const {
	DAYS,
	WEEKEND_DAYS,
} = require('../../../enterprise_business_rules/enum/days.enum');
const CLIENT_TYPES = require('../../../enterprise_business_rules/enum/client-types.enum');
const PERIOD_TYPES = require('../../../enterprise_business_rules/enum/period-types.enum');
const {
	onlyFirstLetters,
	onlyWordsInsideParenthesis,
	allParenthesis,
	getDates,
} = require('../../../utils/regex');

const cheaperHotelUseCase = {
	getDaysFromArgs: text => {
		const days = text
			.match(onlyWordsInsideParenthesis)
			.map(word => word.replace(allParenthesis, '').toLowerCase());
		const allDaysAreValid = days.every(day => DAYS[day.toUpperCase()]);
		if (!allDaysAreValid) {
			throw new Error('Invalid date. Please, check your parameters.');
		}
		return days;
	},
	getDateFromArgs: text => {
		const dates = text.match(getDates)
		return dates
	},
	getClientTypeFromArgs: text => {
		const matches = text.match(onlyFirstLetters);
		if (!matches || !matches.length) {
			throw new Error(
				'You do not passed the client type. Please, check your parameters.'
			);
		}
		const [clientType] = matches;
		if (CLIENT_TYPES[clientType.toUpperCase()]) {
			return CLIENT_TYPES[clientType.toUpperCase()];
		}
		throw new Error('Invalid client type. Please, check your parameters.');
	},

	getPeriod: days => {
		const period = days.map(day => {
			if (WEEKEND_DAYS[day.toUpperCase()]) {
				return PERIOD_TYPES.WEEKEND;
			}
			return PERIOD_TYPES.WEEK;
		});
		return [...new Set(period)];
	},

	getPlans: (allPlans, clientType, inputPeriod, dates) => {
		console.log(clientType, inputPeriod)
		return allPlans
			.filter(plan => {
				const { client, period } = plan;

				return (
					client.description === clientType &&
					inputPeriod.includes(period.description)
				);
			})
			.sort((a, b) => a.price - b.price);
	},

	hasTie: filteredPlans => {
		if (!filteredPlans.length) {
			return false;
		}
		const [firstPlan, secondPlan] = filteredPlans;
		return firstPlan.price === secondPlan.price;
	},

	filterByPriceAndOrderByClassification: filteredPlans => {
		const [firstPlan] = filteredPlans;
		return filteredPlans
			.filter(plan => {
				return plan.price === firstPlan.price;
			})
			.sort((a, b) => b.hotel.classification - a.hotel.classification);
	},

	getCheaperHotel: (args, dataSource = plans) => {
		const [firstArgument] = args;
		const dates = cheaperHotelUseCase.getDateFromArgs(firstArgument)
		const daysReceived = cheaperHotelUseCase.getDaysFromArgs(firstArgument);
		const clientType = cheaperHotelUseCase.getClientTypeFromArgs(firstArgument);
		const period = cheaperHotelUseCase.getPeriod(daysReceived);
		const filteredPlans = cheaperHotelUseCase.getPlans(
			dataSource,
			clientType,
			period,
			dates
		);
		console.log(filteredPlans)
		if (cheaperHotelUseCase.hasTie(filteredPlans)) {
			const [
				cheaperHotel,
			] = cheaperHotelUseCase.filterByPriceAndOrderByClassification(
				filteredPlans
			);
			return `${cheaperHotel.hotel.name}`;
		}
		const [cheaperHotel] = filteredPlans;
		return `${cheaperHotel.hotel.name}`;
	},
};

module.exports = cheaperHotelUseCase;
