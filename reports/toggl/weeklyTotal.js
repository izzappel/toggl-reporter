const colors = require('colors/safe');
const momentUtils = require('../../momentUtils');
const toggl = require('../../toggl');
const taskReport = require('./taskReport');

const startOfWeek = momentUtils.getFirstDayOfWeek();
const endOfWeek = momentUtils.getToday().endOf('day');

console.log(colors.red.bold(momentUtils.getMomentAsString(startOfWeek)), 'to',  colors.red.bold(momentUtils.getMomentAsString(endOfWeek)));

function handleError(error) {
  console.error(error);
}

toggl.getTimeEntries(startOfWeek.toISOString(), endOfWeek.toISOString())
  .then(taskReport)
  .catch(handleError);

