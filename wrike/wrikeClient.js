const request = require('request');
const immutable = require('immutable');
const config = require('../config');
const Contact = require('../model/Contact');
const Timelog = require('../model/Timelog');
const Task = require('../model/Task');
const utils = require('../utils');

let cachedTasks = [];

function createRequest(url) {
  const options = {
    url: `https://www.wrike.com/api/v3/${url}`,
    headers: {
      'Authorization': `bearer ${config.wrikeApiToken}`
    }
  };

  return options;
}

function getMe() {
  return new Promise(
    function (resolve, reject) {
      request(createRequest('contacts?me'), function (error, response, body) {
        if (error || response.statusCode != 200 ) {
          reject(error);
          return;
        }

        var parsedBody = JSON.parse(body);
        const contact = new Contact(parsedBody.data[0]);
        resolve(contact);
      });
    }
  );
}

function getTask(taskId) {
  return new Promise(
    function (resolve, reject) {
      if(cachedTasks[taskId]) {
        resolve(cachedTasks[taskId]);
        return;
      }

      request(createRequest(`tasks/${taskId}`), function (error, response, body) {
        if (error || response.statusCode != 200 ) {
          reject(error);
          return;
        }

        var parsedBody = JSON.parse(body);
        const task = new Task(parsedBody.data[0]);
        cachedTasks[taskId] = task;
        resolve(task);
      });
    }
  );
}

function getTimelogs(startDay, endDay = null) {
  const timelogsPromise = new Promise(
    function (resolve, reject) {
      let options = createRequest(`timelogs?me&trackedDate={"equal":"${startDay.format('YYYY-MM-DD')}"}`);
      if(endDay) {
        options = createRequest(`timelogs?me&trackedDate={"start":"${startDay.format('YYYY-MM-DD')}","end":"${endDay.format('YYYY-MM-DD')}"}`)
      }

      request(options, function (error, response, body) {
        if (error || response.statusCode != 200) {
          reject(error);
          return;
        }

        var parsedBody = JSON.parse(body);

        const timelogs = immutable.List(parsedBody.data.map(wrikeTimelog => new Timelog(wrikeTimelog)));
        resolve(timelogs);
      });
    }
  );

  return timelogsPromise
    .then(getAllTasksForTimelogs);
}

function getAllTasksForTimelogs(timelogs) {
  const promises = [];

  const taskIds = getAllTaskIds(timelogs);
  for(let i = 0; i < taskIds.size; i++) {
    const promise = getTask(taskIds.get(i));
    promises.push(promise);
  }

  const promise = Promise.all(promises);
  return promise.then(tasks => createTimelogs(timelogs, tasks));
}

function createTimelogs(timelogs, tasks) {
  const mappedTimelogs = timelogs.map(timelog => timelog.set('task', getTaskById(tasks, timelog.get('taskId'))));
  return immutable.List(mappedTimelogs);
}

function getTaskById(tasks, id) {
  return tasks.find(task => task.get('id') === id) || null;
}

function getAllTaskIds(timelogs) {
  const taskIds = timelogs.map(timelog => timelog.get('taskId'));
  return taskIds.filter(utils.onlyUnique);
}

module.exports = {
  getMe: getMe,
  getTimelogs: getTimelogs,
};
