export interface Sheet {
    sheet: GoogleAppsScript.Spreadsheet.Sheet | null;
    create(): void;
    build(): void;
}