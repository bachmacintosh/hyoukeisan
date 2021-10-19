import {Sheet} from '.';
export class WaniKaniApiSheet implements Sheet {
    sheet: GoogleAppsScript.Spreadsheet.Sheet | null;

    constructor() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
    }
    build() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        this.sheet.setName('WaniKani API');
        this.sheet.getRange('A1:A2').setValues([
            ['WaniKani API Key:'],
            ['ETag:']
        ]).setFontWeight('bold');
        this.sheet.autoResizeColumn(1);
    }
    getApiKey(): string {
        return this.sheet?.getRange('B1').getValue();
    }
}