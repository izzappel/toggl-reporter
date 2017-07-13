
const moment = require('moment');
const momentUtils = require('../momentUtils');
const toggl = require('./toggl');

function loadFlextime() {
	const startOfDeepImpact = moment('2017-01-09', 'YYYY-MM-DD');
	const today = momentUtils.getToday().endOf('day');


	return toggl.getTimeEntries(startOfDeepImpact.toISOString(), today.toISOString())
		.then(bla);
}

function bla(timeEntries) {
	  return cummulateFlextime(calculateFlextimePerDay(utils.groupTimeEntriesByDay(timeEntries)));
}

function cummulateFlextime(flextimePerDays) {
  return flextimePerDays.reduce((flextime, flextimePerDay) => flextime + flextimePerDay, 0);
}