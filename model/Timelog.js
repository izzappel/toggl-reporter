const immutable = require('immutable');

const TimelogRecord = immutable.Record({
  id: null,
  taskId: null,
  userId: null,
  hours: null,
  createdDate: null,
  trackedDate: null,
  comment: null,
  task: null,
});

class Timelog extends TimelogRecord {
  constructor(wrikeTimelog) {
    super(wrikeTimelog);
  }

  getTaskTitle() {
    return this.task.get('title');
  }

}

module.exports = Timelog;

