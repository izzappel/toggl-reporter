const immutable = require('immutable');
const colors = require('colors/safe');
const Table = require('cli-table2');
const momentUtils = require('../momentUtils');
const utils = require('../utils');


function printTimeEntriesGroupedByTask(timeEntries) {
  const table = new Table({
    head: ['Project', 'Task', 'Duration'],
    colWidths: [20, 20, 20]
  });

  printTimeEntryGroups(groupByTask(timeEntries), table);
  printTable(table);
}

function printTimeEntryGroups(timeEntryGroups, table) {
  const allReportData = createReportData(timeEntryGroups);
  allReportData.forEach(reportData => printReportData(reportData, table));
  printFooterReportTotal(allReportData, table);
}

function groupByTask(timeEntries) {
  return timeEntries.groupBy(timeEntry => timeEntry.get('description'));
}

function createReportData(timeEntryGroups) {
  return timeEntryGroups.map(createReportDataForGroup);
}

function createReportDataForGroup(group) {
  const totalDurationForGroup = calculateDurationForGroup(group);
  const projectName = group.first().getIn(['project', 'name']);
  const description = group.first().get('description');

  return immutable.fromJS({
    projectName,
    description,
    duration: totalDurationForGroup,
  });
}

function calculateDurationForGroup(group) {
  return group.valueSeq().reduce((totalDuration, timeEntry) => totalDuration + timeEntry.get('duration'), 0);
}

function printReportData(reportData, table) {
  const durationAsString = momentUtils.getDurationInSecondsAsString(reportData.get('duration'));

  table.push([
    reportData.get('projectName'),
    reportData.get('description'),
    durationAsString,
  ]);
}

function printFooterReportTotal(allReportData, table) {
  const accumulatedDuration = calculateDurationForTotal(allReportData);

  table.push([
    { colSpan:2, content:colors.red('Total') },
    colors.red.bold(momentUtils.getDurationInSecondsAsString(accumulatedDuration))
  ]);
}

function calculateDurationForTotal(allReportData) {
  return allReportData
    .valueSeq()
    .reduce((totalDuration, reportData) => totalDuration + (utils.isPrivateProject(reportData.get('projectName')) ? 0 : reportData.get('duration')), 0);
}

function printTable(table) {
  console.log(table.toString());
}

module.exports = printTimeEntriesGroupedByTask;
