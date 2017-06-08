const colors = require('colors/safe');
const momentUtils = require('../../../momentUtils');

function print(flextime) {
	console.log('acutal cummulated flextime:', colors.red.bold(momentUtils.getDurationInSecondsAsString(flextime)));
}

module.exports = print;