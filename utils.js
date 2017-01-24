const moment = require('moment');
const config = require('./config');

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function isPrivateProject(projectName) {
  return config.privateProjects.includes(projectName);
}

function groupByDay(timeEntries) {
  return timeEntries.groupBy(timeEntry => {
    const dateString = moment(timeEntry.get('start')).format('DD.MM.YYYY');
    return dateString;
  });
}

module.exports = {
  onlyUnique: onlyUnique,
  isPrivateProject: isPrivateProject,
  groupByDay: groupByDay,
};
