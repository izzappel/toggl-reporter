const moment = require('moment');
const Excel = require('exceljs');
const momentUtils = require('./momentUtils');
const togglClient = require('./toggl/togglClient');
const excelWriter = require('./excelWriter');

const args = process.argv.slice(2);

const today = momentUtils.getToday().toISOString();
const firstDayOfMonth = momentUtils.getFirstDayOfMonth().toISOString();

console.log(args);

console.log(today);
console.log(firstDayOfMonth);

var workbook = new Excel.Workbook();
var sheet = workbook.addWorksheet('Januar');

function handleError(error) {
  console.error(error);
}

togglClient.getTimeEntries(firstDayOfMonth, today)
  .then(writeTimeEntriesToExcel)
  .catch(handleError);

function writeTimeEntriesToExcel(timeEntries) {
  const promises = [];

  excelWriter.writeWorksheetHeader(sheet);

  for (let i = 0; i < timeEntries.length; i++) {
    const promise = excelWriter.writeTimeEntryToWorksheet(timeEntries[i], sheet);
    promises.push(promise);
  }

  return Promise.all(promises)
    .then(() => excelWriter.saveWorkbook(workbook))
    .catch(handleError);
}