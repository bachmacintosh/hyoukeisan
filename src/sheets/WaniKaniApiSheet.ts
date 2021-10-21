import {Sheet} from '.';
export class WaniKaniApiSheet implements Sheet {
    sheet: GoogleAppsScript.Spreadsheet.Sheet | null;

    constructor() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
    }
    build() {
        this.sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        this.sheet.setName('WaniKani API');
        this.sheet.getRange('A1:A12').setValues([
            ['WaniKani API Key:'],
            ['User ETag:'],
            ['Summary ETag:'],
            ['SRS ETag:'],
            ['Subjects ETag:'],
            ['Assignments ETag:'],
            ['Level Progressions ETag:'],
            ['Resets ETag:'],
            ['Reviews ETag:'],
            ['Review Statistics ETag:'],
            ['Study Materials ETag:'],
            ['Voice Actors ETag:']
        ]).setFontWeight('bold');
        this.sheet.autoResizeColumn(1);
    }
    getApiKey(): string {
        return this.sheet?.getRange('B1').getValue() ?? '';
    }
}