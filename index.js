const cheaperHotelController = require('./src/interface_adapters/controllers/cheaper-hotel');

const commandLineArguments = process.argv.slice(2);
if (commandLineArguments.length) {
	console.log(cheaperHotelController.getCheaperHotel(commandLineArguments));
}
