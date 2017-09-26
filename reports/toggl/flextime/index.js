const colors = require('colors/safe');
const moment = require('moment');
const momentUtils = require('../../../momentUtils');
const utils = require('../../../utils');
const toggl = require('../../../toggl');
const print = require('./print');
const flextime = require('./flextime');

const args = process.argv.slice(2);

const start = utils.getStartOfDeepImpact();
const lastTwoMonths = momentUtils.getToday().subtract(1, 'month').startOf('month');
const today = momentUtils.getToday().endOf('day');

console.log(colors.red.bold(momentUtils.getMomentAsString(start)), 'to',  colors.red.bold(momentUtils.getMomentAsString(today)));

function handleError(error) {
  console.error(error);
}

toggl.getTimeEntries(lastTwoMonths.toISOString(), today.toISOString())
  .then(timeEntries => print(flextime.calculate(timeEntries)))
  .catch(handleError);
