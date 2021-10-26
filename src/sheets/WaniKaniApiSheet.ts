import {Sheet} from '.';
export class WaniKaniApiSheet implements Sheet {
    _sheet: GoogleAppsScript.Spreadsheet.Sheet | null;

    constructor() {
        this._sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
    }

    get sheet() {
        return this._sheet;
    }

    create() {
        this._sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        this._sheet.setName('WaniKani API');
    }

    build() {
        this._sheet?.getRange('A1:A12').setValues([
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
        this._sheet?.autoResizeColumn(1);
    }
    getApiKey(): string {
        return this._sheet?.getRange('B1').getValue() ?? '';
    }

    getUserEtag(): string {
        return this._sheet?.getRange('B2').getValue() ?? '';
    }

    setUserEtag(etag: string) {
        this._sheet?.getRange('B2').setValue(etag);
    }
}