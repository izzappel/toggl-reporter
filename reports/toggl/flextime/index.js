const colors = require('colors/safe');
const momentUtils = require('../../../momentUtils');
const utils = require('../../../utils');
const toggl = require('../../../toggl');
const print = require('./print');
const flextime = require('./flextime');

const args = process.argv.slice(2);

const startOfDeepImpact = utils.getStartOfDeepImpact();
const today = momentUtils.getToday().endOf('day');

console.log(colors.red.bold(momentUtils.getMomentAsString(startOfDeepImpact)), 'to',  colors.red.bold(momentUtils.getMomentAsString(today)));

function handleError(error) {
  console.error(error);
}

toggl.getTimeEntries(startOfDeepImpact.toISOString(), today.toISOString())
  .then(timeEntries => print(flextime.calculate(timeEntries)))
  .catch(handleError);
