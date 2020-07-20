/* eslint-disable no-undef */
const {
	plans,
	tiedPlans,
} = require('../../src/frameworks_drivers/database/db');
const cheaperHotelController = require('../../src/business_rules/use_cases/cheaper-hotel/cheaper-hotel');
const Plan = require('../../src/enterprise_business_rules/model/plan.model');
const {
	lakewood,
	bridgewood,
	ridgewood,
	regular,
	reward,
	week,
	weekend,
} = require('../../src/frameworks_drivers/database/db');
const DAYS = require('../../src/enterprise_business_rules/enum/days.enum');
const CLIENT_TYPES = require('../../src/enterprise_business_rules/enum/client-types.enum');
const PERIOD_TYPES = require('../../src/enterprise_business_rules/enum/period-types.enum');

describe('cheaper hotel controller test', () => {
	it('should return the id', () => {
		const [firstPlan] = plans;
		expect(regular.id).toBe(1);
		expect(bridgewood.id).toBe(2);
		expect(week.id).toBe(1);
		expect(firstPlan.id).toBe(1);
	});

	it('should return an array with all days in a correct format', () => {
		const cmdArguments =
			'Regular: 16Mar2009(mon), 17Mar2009(TUES), 18Mar2009(WeD)';
		expect(cheaperHotelController.getDaysFromArgs(cmdArguments)).toMatchObject([
			DAYS.WEEK_DAYS.MON,
			DAYS.WEEK_DAYS.TUES,
			DAYS.WEEK_DAYS.WED,
		]);
	});

	it('should throw an error because date is invalid', () => {
		const cmdArguments =
			'Regular: 16Mar2009(monday), 17Mar2009(tuesday), 18Mar2009(wednesday)';
		expect(() =>
			cheaperHotelController.getDaysFromArgs(cmdArguments)
		).toThrow();
	});

	it('should throw an error because no client type was provided', () => {
		const cmdArguments = ': 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)';
		expect(() =>
			cheaperHotelController.getClientTypeFromArgs(cmdArguments)
		).toThrow();
	});

	it('should throw an error because client type provided is invalid', () => {
		const cmdArguments =
			'Special: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)';
		expect(() =>
			cheaperHotelController.getClientTypeFromArgs(cmdArguments)
		).toThrow();
	});

	it('should return an empty array when an empty array is passed', () => {
		const days = [];
		expect(cheaperHotelController.getPeriod(days)).toEqual([]);
	});

	it('should return mon, tues and wed, thur and fri as a week day', () => {
		const days = ['mon', 'tues', 'wed', 'thur', 'fri'];
		expect(cheaperHotelController.getPeriod(days)).toEqual([PERIOD_TYPES.WEEK]);
	});

	it('should return sat and sun as a week day', () => {
		const days = ['sat', 'sun'];
		expect(cheaperHotelController.getPeriod(days)).toEqual([
			PERIOD_TYPES.WEEKEND,
		]);
	});

	it('should return an array with weekend and week when function receive week days and weekend days as a parameter', () => {
		const days = ['sat', 'mon', 'wed'];
		expect(cheaperHotelController.getPeriod(days)).toEqual([
			PERIOD_TYPES.WEEKEND,
			PERIOD_TYPES.WEEK,
		]);
	});

	it('should return an array of plans ordered by price. These plans need to be only for Regular client and for week days', () => {
		expect(
			cheaperHotelController.getPlans(plans, CLIENT_TYPES.REGULAR, [
				PERIOD_TYPES.WEEK,
			])
		).toEqual([
			new Plan({
				id: 1,
				hotel: lakewood,
				client: regular,
				period: week,
				price: 110,
			}),
			new Plan({
				id: 5,
				hotel: bridgewood,
				client: regular,
				period: week,
				price: 160,
			}),
			new Plan({
				id: 9,
				hotel: ridgewood,
				client: regular,
				period: week,
				price: 220,
			}),
		]);
	});

	it('should return an array of plans ordered by price. These plans need to be only for Reward client and for weekend days', () => {
		expect(
			cheaperHotelController.getPlans(plans, CLIENT_TYPES.REWARD, [
				PERIOD_TYPES.WEEKEND,
			])
		).toMatchObject([
			new Plan({
				id: 12,
				hotel: ridgewood,
				client: reward,
				period: weekend,
				price: 40,
			}),
			new Plan({
				id: 8,
				hotel: bridgewood,
				client: reward,
				period: weekend,
				price: 50,
			}),
			new Plan({
				id: 4,
				hotel: lakewood,
				client: reward,
				period: weekend,
				price: 80,
			}),
		]);
	});

	it('should return an array of plans ordered by price. These plans need to be only for Reward client and for weekend and week days', () => {
		expect(
			cheaperHotelController.getPlans(plans, CLIENT_TYPES.REWARD, [
				PERIOD_TYPES.WEEKEND,
				PERIOD_TYPES.WEEK,
			])
		).toEqual([
			new Plan({
				id: 12,
				hotel: ridgewood,
				client: reward,
				period: weekend,
				price: 40,
			}),
			new Plan({
				id: 8,
				hotel: bridgewood,
				client: reward,
				period: weekend,
				price: 50,
			}),
			new Plan({
				id: 2,
				hotel: lakewood,
				client: reward,
				period: week,
				price: 80,
			}),
			new Plan({
				id: 4,
				hotel: lakewood,
				client: reward,
				period: weekend,
				price: 80,
			}),
			new Plan({
				id: 10,
				hotel: ridgewood,
				client: reward,
				period: week,
				price: 100,
			}),
			new Plan({
				id: 6,
				hotel: bridgewood,
				client: reward,
				period: week,
				price: 110,
			}),
		]);
	});

	it('should return false when has no tie between plans', () => {
		expect(
			cheaperHotelController.hasTie([
				new Plan({
					id: 12,
					hotel: ridgewood,
					client: reward,
					period: weekend,
					price: 40,
				}),
				new Plan({
					id: 8,
					hotel: bridgewood,
					client: reward,
					period: weekend,
					price: 50,
				}),
			])
		).toBeFalsy();
	});

	it('should return false when receive an empty array as parameter', () => {
		expect(cheaperHotelController.hasTie([])).toBeFalsy();
	});

	it('should return true when has tie between plans', () => {
		expect(
			cheaperHotelController.hasTie([
				new Plan({
					id: 12,
					hotel: ridgewood,
					client: reward,
					period: weekend,
					price: 40,
				}),
				new Plan({
					id: 8,
					hotel: bridgewood,
					client: reward,
					period: weekend,
					price: 40,
				}),
			])
		).toBeTruthy();
	});

	it('should order by classification when plans has the same price that first plan on array', () => {
		const plans = [
			new Plan({
				id: 8,
				hotel: bridgewood,
				client: reward,
				period: weekend,
				price: 40,
			}),
			new Plan({
				id: 2,
				hotel: lakewood,
				client: reward,
				period: week,
				price: 40,
			}),
			new Plan({
				id: 6,
				hotel: bridgewood,
				client: reward,
				period: week,
				price: 70,
			}),
			new Plan({
				id: 12,
				hotel: ridgewood,
				client: reward,
				period: weekend,
				price: 40,
			}),
		];
		expect(
			cheaperHotelController.filterByPriceAndOrderByClassification(plans)
		).toEqual([
			new Plan({
				id: 12,
				hotel: ridgewood,
				client: reward,
				period: weekend,
				price: 40,
			}),
			new Plan({
				id: 8,
				hotel: bridgewood,
				client: reward,
				period: weekend,
				price: 40,
			}),
			new Plan({
				id: 2,
				hotel: lakewood,
				client: reward,
				period: week,
				price: 40,
			}),
		]);
	});

	it('should return the cheaper hotel', () => {
		const cmdArgumentsRegular = [
			'Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)',
		];

		expect(cheaperHotelController.getCheaperHotel(cmdArgumentsRegular)).toBe(
			'Lakewood'
		);

		const cmdArgumentsReward = [
			'Reward: 26Mar2009(thur), 27Mar2009(fri), 28Mar2009(sat)',
		];

		expect(cheaperHotelController.getCheaperHotel(cmdArgumentsReward)).toBe(
			'Ridgewood'
		);
	});

	it('should return the hotel that has the highest classification when has a tied plan', () => {
		const cmdArgumentsRegular = [
			'Regular: 16Mar2009(mon), 17Mar2009(tues), 18Mar2009(wed)',
		];
		expect(
			cheaperHotelController.getCheaperHotel(cmdArgumentsRegular, tiedPlans)
		).toBe('Ridgewood');
	});
});
