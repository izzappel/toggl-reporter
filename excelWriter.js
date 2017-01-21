const Excel = require('exceljs');

function saveWorkbook(workbook) {
  workbook.xlsx.writeFile('./tmp.xlsx')
    .then(function () {
      // done
      console.log("wrote excel worksbook");
    })
}

function writeWorksheetHeader(worksheet) {
  worksheet.addRow(['id', 'guid', 'wid', 'pid', 'projectName', 'billable', 'start', 'stop', 'duration', 'description', 'duronly', 'at', 'uid']);
}

function writeTimeEntryToWorksheet(timeEntry, worksheet) {
  worksheet.addRow([
    timeEntry.id,
    timeEntry.guid,
    timeEntry.wid,
    timeEntry.pid,
    timeEntry.project ? timeEntry.project.name : '-',
    timeEntry.billable,
    timeEntry.start,
    timeEntry.stop,
    timeEntry.duration,
    timeEntry.description,
    timeEntry.duronly,
    timeEntry.at,
    timeEntry.uid
  ]);
}

module.exports = {
  writeWorksheetHeader: writeWorksheetHeader,
  writeTimeEntryToWorksheet: writeTimeEntryToWorksheet,
  saveWorkbook: saveWorkbook,
};