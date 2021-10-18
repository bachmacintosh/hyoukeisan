export interface Sheet {
    build(): void;
    checkIfExists(): GoogleAppsScript.Spreadsheet.Sheet | null;
}