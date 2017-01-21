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
}

module.exports = TimeEntry;