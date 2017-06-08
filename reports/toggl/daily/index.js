const colors = require('colors/safe');
const moment = require('moment');
const momentUtils = require('../../../momentUtils');
const toggl = require('../../../toggl');
const print = require('./print');
const daily = require('./daily');

const args = process.argv.slice(2);

const startOfToday = getStartDateFromArgs(args);
const endOfToday = moment(startOfToday).endOf('day');

console.log(colors.red.bold(momentUtils.getMomentAsString(startOfToday)), 'to',  colors.red.bold(momentUtils.getMomentAsString(endOfToday)));

function handleError(error) {
  console.error(error);
}

toggl.getTimeEntries(startOfToday.toISOString(), endOfToday.toISOString())
  .then(timeEntries => print(daily.groupAndSortByDescription(timeEntries)))
  .catch(handleError);

function getStartDateFromArgs(args) {
  if (args.length > 0) {
    const firstArgument = args[0];

    if (firstArgument === 'yesterday') {
      return momentUtils.getYesterday();
    }

    if (firstArgument === 'today') {
      return momentUtils.getToday();
    }

    if (firstArgument === 'monday') {
      return momentUtils.getFirstDayOfWeek();
    }

    if (firstArgument === 'tuesday') {
      return momentUtils.getFirstDayOfWeek().add(1, 'day');
    }

    if (firstArgument === 'wednesday') {
      return momentUtils.getFirstDayOfWeek().add(2, 'day');
    }

    if (firstArgument === 'thursday') {
      return momentUtils.getFirstDayOfWeek().add(3, 'day');
    }

    if (firstArgument === 'friday') {
      return momentUtils.getFirstDayOfWeek().add(4, 'day');
    }

    if (firstArgument === 'saturday') {
      return momentUtils.getFirstDayOfWeek().add(5, 'day');
    }

    if (firstArgument === 'sunday') {
      return momentUtils.getFirstDayOfWeek().add(6, 'day');
    }
  }

  return momentUtils.getToday();
}


