const immutable = require('immutable');

const TaskRecord = immutable.Record({
  id: null,
  accountId: null,
  title: null,
  description: null,
  briefDescription: null,
  parentIds:[],
  superParentIds:[],
  sharedIds:[],
  responsibleIds:[],
  status: null,
  importance: null,
  createdDate: null,
  updatedDate: null,
  dates: null,
  scope: null,
  authorIds:[],
  customStatusId: null,
  hasAttachments: null,
  permalink: null,
  priority: null,
  followedByMe: null,
  followerIds:[],
  superTaskIds:[],
  subTaskIds:[],
  dependencyIds:[],
  metadata:[],
  customFields:[]
});

class Task extends TaskRecord {
  constructor(wrikeTimelog) {
    super(wrikeTimelog);
  }

}

module.exports = Task;


