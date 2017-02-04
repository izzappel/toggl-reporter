const immutable = require('immutable');
const config = require('../config');

const ProjectRecord = immutable.Record({
  id: null,
  wid: null,
  name: null,
  billable: false,
  is_private: false,
  active: null,
  template: 0,
  at: null,
  created_at: null,
  color: null,
  auto_estimates: null,
  actual_hours: null,
  hex_color: null,
});


class Project extends ProjectRecord {
  constructor(togglProject) {
    super(togglProject);
  }

  isPrivate() {
    return config.privateProjects.includes(this.name);
  }
}

module.exports = Project;