const colors = require('colors/safe');
const Table = require('cli-table2');
const momentUtils = require('../../../momentUtils');
const utils = require('../../../utils');

function printGroupedTimeEntryDayTable(groupedTimeEntries) {
  const table = new Table({
    head: ['Project', 'Task', 'Duration'],
    colWidths: [20, 30, 20]
  });

  groupedTimeEntries.forEach(timeEntry => addTimeEntryToTable(timeEntry, table));
  addFooterTotalToTable(utils.calculateBillableDuration(groupedTimeEntries), table);

  printTable(table);
}

function addTimeEntryToTable(timeEntry, table) {
  const durationAsString = momentUtils.getDurationInSecondsAsString(timeEntry.getDuration());

  if (timeEntry.get('project').isPrivate()) {
    table.push([
      colors.gray(timeEntry.getProjectName()),
      colors.gray(timeEntry.get('description')),
      colors.gray(durationAsString),
    ]);
  } else {
    table.push([
      timeEntry.getProjectName(),
      timeEntry.get('description'),
      durationAsString,
    ]);
  }
}

function addFooterTotalToTable(totalBillableDuration, table) {
  table.push([
    { colSpan: 2, content: colors.red('Total') },
    colors.red.bold(momentUtils.getDurationInSecondsAsString(totalBillableDuration))
  ]);
}

function printTable(table) {
  console.log(table.toString());
}

module.exports = printGroupedTimeEntryDayTable;
