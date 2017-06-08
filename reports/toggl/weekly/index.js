const colors = require('colors/safe');
const moment = require('moment');
const momentUtils = require('../../../momentUtils');
const toggl = require('../../../toggl');
const weekly = require('./weekly');
const print = require('./print');

const args = process.argv.slice(2);

const startOfWeek = getStartDateFromArgs(args);
const endOfWeek = moment(startOfWeek).endOf('isoWeek');

console.log(colors.red.bold(momentUtils.getMomentAsString(startOfWeek)), 'to',  colors.red.bold(momentUtils.getMomentAsString(endOfWeek)));

function handleError(error) {
  console.error(error);
}

toggl.getTimeEntries(startOfWeek.toISOString(), endOfWeek.toISOString())
  .then(timeEntries => print(weekly.groupByDay(timeEntries)))
  .catch(handleError);

function getStartDateFromArgs(args) {
  if (args.length > 0) {
    const firstArgument = args[0];

    if (firstArgument === 'last') {
      return momentUtils.getFirstDayOfLastWeek();
    }
  }

  return momentUtils.getFirstDayOfWeek();
}