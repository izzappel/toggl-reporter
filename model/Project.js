const immutable = require('immutable');

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
    //this.id = togglProject.id;
    //this.wid = togglProject.wid;
    //this.name = togglProject.name;
    //this.billable = togglProject.billable;
    //this.is_private = togglProject.is_private;
    //this.active = togglProject.active;
    //this.template = togglProject.template;
    //this.at = togglProject.at;
    //this.created_at = togglProject.created_at;
    //this.color = togglProject.color;
    //this.auto_estimates = togglProject.auto_estimates;
    //this.actual_hours = togglProject.actual_hours;
    //this.hex_color = togglProject.hex_color;
  }
}

module.exports = Project;