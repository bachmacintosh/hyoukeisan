export interface Sheet {
    sheet: GoogleAppsScript.Spreadsheet.Sheet | null;
    build(): void;
}