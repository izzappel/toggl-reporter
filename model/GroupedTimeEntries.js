const immutable = require('immutable');

const GroupedTimeEntriesRecord = immutable.Record({
  duration: 0,
  description: null,
  project: null,
  timeEntries: [],
});

class GroupedTimeEntries extends GroupedTimeEntriesRecord {
  constructor(groupedTimeEntries) {
    super(groupedTimeEntries);
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

module.exports = GroupedTimeEntries;