import {Builder} from '.';
export class WaniKaniApiSheetBuilder implements Builder {
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