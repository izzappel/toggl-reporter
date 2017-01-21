const TogglClient = require('toggl-api');
const config = require('../config');

const toggl = new TogglClient({ apiToken: config.togglApiToken });

let cachedProjectData = [];

function getTimeEntries(startDate, endDate) {
  return new Promise(
    function (resolve, reject) {
      toggl.getTimeEntries(startDate, endDate, function (error, timeEntries) {
        if (error) {
          reject(error);
          return;
        }

        resolve(timeEntries);
      });
    }
  );
}

function getProjectData(projectId) {
  return new Promise(
    function (resolve, reject) {
      if(cachedProjectData[projectId]){
        resolve(cachedProjectData[projectId]);
        return;
      }

      toggl.getProjectData(projectId, function (error, projectData) {
        if (error) {
          reject(error);
          return;
        }

        cachedProjectData[projectId] = projectData;
        resolve(projectData);
      });
    }
  );
}

module.exports = {
  getTimeEntries: getTimeEntries,
  getProjectData: getProjectData,
};
