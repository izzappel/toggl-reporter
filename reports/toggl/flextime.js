const colors = require('colors/safe');
const moment = require('moment');
const momentUtils = require('../../momentUtils');
const togglClient = require('../../toggl/togglClient');
const flextimeReport = require('./flextimeReport');

const args = process.argv.slice(2);

const startOfDeepImpact = moment('2017-01-09', 'YYYY-MM-DD');
const today = momentUtils.getToday().endOf('day');

console.log(colors.red.bold(momentUtils.getMomentAsString(startOfDeepImpact)), 'to',  colors.red.bold(momentUtils.getMomentAsString(today)));

function handleError(error) {
  console.error(error);
}

togglClient.getTimeEntries(startOfDeepImpact.toISOString(), today.toISOString())
  .then(flextimeReport)
  .catch(handleError);
