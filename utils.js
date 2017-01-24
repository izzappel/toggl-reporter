const config = require('./config');

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}

function isPrivateProject(projectName) {
  return config.privateProjects.includes(projectName);
}

module.exports = {
  onlyUnique: onlyUnique,
  isPrivateProject: isPrivateProject,
};
