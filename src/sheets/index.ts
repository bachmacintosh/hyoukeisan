export interface Sheet {
    _sheet: GoogleAppsScript.Spreadsheet.Sheet | null;
    create(): void;
    build(): void;
}