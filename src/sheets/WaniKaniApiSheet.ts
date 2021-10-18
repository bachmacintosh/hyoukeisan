import {Sheet} from '.';
export class WaniKaniApiSheet implements Sheet {
    checkIfExists(): GoogleAppsScript.Spreadsheet.Sheet | null {
        return SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
    }
    build() {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        sheet.setName('WaniKani API');
        sheet.getRange('A1:A2').setValues([
            ['WaniKani API Key:'],
            ['ETag:']
        ]).setFontWeight('bold');
        sheet.autoResizeColumn(1);
    }
}