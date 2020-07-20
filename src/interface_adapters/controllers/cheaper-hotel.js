const cheaperHotelUseCase = require('../../business_rules/use_cases/cheaper-hotel/cheaper-hotel');

const cheaperHotelController = {
	getCheaperHotel: commandLineArguments =>
		cheaperHotelUseCase.getCheaperHotel(commandLineArguments),
};

module.exports = cheaperHotelController;
