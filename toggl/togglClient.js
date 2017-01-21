const togglClient = require('./togglClientWrapper');
const immutable = require('immutable');
const TimeEntry = require('../model/TimeEntry');
const Project = require('../model/Project');
const utils = require('../utils');


function getTimeEntries(startDate, endDate) {
  return togglClient.getTimeEntries(startDate, endDate)
    .then(getAllProjectDataForTimeEntries);
}

function getAllProjectDataForTimeEntries(togglTimeEntries) {
  const promises = [];

  const projectIds = getAllProjectIds(togglTimeEntries);
  for (let i = 0; i < projectIds.length; i++) {
    const promise = togglClient.getProjectData(projectIds[i]);
    promises.push(promise);
  }

  const promise = Promise.all(promises);
  return promise.then((togglProjects) => createTimeEntries(togglTimeEntries, togglProjects));
}

function createTimeEntries(togglTimeEntries, togglProjects) {
  const mappedTimeEntries = togglTimeEntries.map(togglTimeEntry => {
    const timeEntry = new TimeEntry(togglTimeEntry);
    const togglProject = getProjectById(togglProjects, timeEntry.pid);
    const project = new Project(togglProject);

    return timeEntry.set('project', project);
  });

  return immutable.List(mappedTimeEntries);
}

function getProjectById(togglProjects, id) {
  return togglProjects.find(togglProject => togglProject.id === id) || null;
}

function getAllProjectIds(timeEntries) {
  const projectIds = timeEntries.map(timeEntry => timeEntry.pid);
  return projectIds.filter(utils.onlyUnique);
}

module.exports = {
  getTimeEntries: getTimeEntries,
};