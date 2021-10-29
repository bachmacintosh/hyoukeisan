export interface BaseSheetInterface {
    readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;
    build(): void;
}