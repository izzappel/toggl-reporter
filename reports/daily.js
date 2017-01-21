const colors = require('colors/safe');
const momentUtils = require('../momentUtils');
const togglClient = require('../toggl/togglClient');
const taskReport = require('./taskReport');

const startOfToday = momentUtils.getToday();
const endOfToday = momentUtils.getToday().endOf('day');

console.log(colors.red.bold(momentUtils.getMomentAsString(startOfToday)), 'to',  colors.red.bold(momentUtils.getMomentAsString(endOfToday)));

function handleError(error) {
  console.error(error);
}

togglClient.getTimeEntries(startOfToday.toISOString(), endOfToday.toISOString())
  .then(taskReport)
  .catch(handleError);


