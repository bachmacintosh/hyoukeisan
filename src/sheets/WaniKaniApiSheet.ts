import {BaseSheetInterface} from "./BaseSheetInterface";

export class WaniKaniApiSheet implements BaseSheetInterface {
    public readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;

    public constructor() {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
        if (sheet === null) {
            this.sheet = WaniKaniApiSheet.create();
        } else {
            this.sheet = sheet;
        }
    }

    private static create() {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        sheet.setName('WaniKani API');
        return sheet;
    }

    public build() {
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

    public getApiKey(): string {
        return this.sheet.getRange('B1').getValue();
    }

    public getUserEtag(): string {
        return this.sheet.getRange('B2').getValue();
    }

    public setUserEtag(etag: string): void {
        this.sheet.getRange('B2').setValue(etag);
    }
}