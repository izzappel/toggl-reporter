const colors = require('colors/safe');
const moment = require('moment');
const momentUtils = require('../../momentUtils');
const wrikeClient = require('../../wrike/wrikeClient');
const timelogReport = require('./timelogReport');

const args = process.argv.slice(2);

const day = getDayFromArgs(args);

console.log(colors.red.bold(momentUtils.getMomentAsString(day)));

function handleError(error) {
  console.error(error);
}

wrikeClient.getTimelogs(day)
  .then(timelogReport)
  .catch(handleError);

function getDayFromArgs(args) {
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