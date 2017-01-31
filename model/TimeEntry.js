const immutable = require('immutable');

const TimeEntryRecord = immutable.Record({
  id: null,
  guid: null,
  wid: null,
  pid: null,
  billable: false,
  start: null,
  stop: null,
  duration: 0,
  description: null,
  duronly: false,
  at: null,
  uid: null,
  project: null,
});

class TimeEntry extends TimeEntryRecord {
  constructor(togglTimeEntry) {
    super(togglTimeEntry);
  }

  getDuration() {
    if (this.duration < 0) {
      const secondsSinceEpoche = (new Date()).getTime() / 1000;
      return secondsSinceEpoche + this.duration;
    }

    return this.duration;
  }

  getBillableDuration() {
    if (this.project.isPrivate()) {
      return 0;
    }

    return this.getDuration();
  }

  getProjectName() {
    return this.project.get('name');
  }
}

module.exports = TimeEntry;