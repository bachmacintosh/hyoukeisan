export interface UIInterface {
    pressedButton: GoogleAppsScript.Base.Button;
    readonly interface: GoogleAppsScript.Base.Ui;
    setupDynamicMenu(e: GoogleAppsScript.Events.SheetsOnOpen|GoogleAppsScript.Events.AddonOnInstall): void;
    setupFullMenu(): void;
    askForAccessToken(): void;
}