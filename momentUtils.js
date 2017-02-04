var moment = require('moment');
require("moment-duration-format");

function getToday() {
  const today = moment();
  return today.startOf('day');
}

function getYesterday() {
  const today = getToday();
  return today.subtract(1, 'day');
}

function getFirstDayOfMonth() {
  const today = getToday();
  const firstDayOfMonth = today.date(1);
  return firstDayOfMonth;
}

function getFirstDayOfWeek() {
  const today = getToday();
  const firstDayOfWeek = today.startOf('isoWeek');
  return firstDayOfWeek;
}

function getFirstDayOfLastWeek() {
  const today = getToday();
  const firstDayOfLastWeek = today.subtract(1, 'weeks').startOf('isoWeek');
  return firstDayOfLastWeek;
}

function getDurationInSecondsAsString(durationInSeconds) {
  const momentDuration = moment.duration(durationInSeconds, 'seconds');
  return momentDuration.format("HH:mm:ss");
}

function getDurationInHoursAsString(durationInHours) {
  const momentDuration = moment.duration(durationInHours, 'hours');
  return momentDuration.format("HH:mm:ss");
}

function getMomentAsString(moment) {
  return moment.format('dddd, DD.MM.YYYY');
}

function compareMoments(moment1, moment2) {
  if (moment1.isSame(moment2)) {
    return 0;
  }

  if (moment1.isBefore(moment2)) {
    return -1;
  }

  return 1;
}

module.exports = {
  getToday: getToday,
  getYesterday: getYesterday,
  getFirstDayOfMonth: getFirstDayOfMonth,
  getFirstDayOfWeek: getFirstDayOfWeek,
  getFirstDayOfLastWeek: getFirstDayOfLastWeek,
  getDurationInSecondsAsString: getDurationInSecondsAsString,
  getDurationInHoursAsString: getDurationInHoursAsString,
  getMomentAsString: getMomentAsString,
  compareMoments: compareMoments,
};
