const colors = require('colors/safe');
const momentUtils = require('../../momentUtils');
const togglClient = require('../../toggl/togglClient');
const taskReport = require('./taskReport');

const startOfWeek = momentUtils.getFirstDayOfWeek();
const endOfWeek = momentUtils.getToday().endOf('day');

console.log(colors.red.bold(momentUtils.getMomentAsString(startOfWeek)), 'to',  colors.red.bold(momentUtils.getMomentAsString(endOfWeek)));

function handleError(error) {
  console.error(error);
}

togglClient.getTimeEntries(startOfWeek.toISOString(), endOfWeek.toISOString())
  .then(taskReport)
  .catch(handleError);

