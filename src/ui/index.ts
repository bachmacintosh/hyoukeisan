import {UIInterface} from "./UIInterface";

export class UI implements UIInterface {
    public pressedButton: GoogleAppsScript.Base.Button;
    private menu: GoogleAppsScript.Base.Menu;
    public readonly interface: GoogleAppsScript.Base.Ui;

    constructor() {
        this.interface = SpreadsheetApp.getUi();
        this.pressedButton = this.interface.Button.CLOSE;
        this.menu = this.interface.createAddonMenu();
    }

    promptForEnable(): void {
        this.pressedButton = this.interface.alert('Enable Add-On?', 'This will add and pre-fill some sheets into the spreadsheet. Is that okay?', this.interface.ButtonSet.YES_NO);
    }

    setupDynamicMenu(e: GoogleAppsScript.Events.SheetsOnOpen|GoogleAppsScript.Events.AddonOnInstall) {
        if(e.authMode === ScriptApp.AuthMode.LIMITED || e.authMode === ScriptApp.AuthMode.FULL) {
            this.setupFullMenu();
        } else {
            this.menu
                .addItem('Enable Add-On', 'enableAddOn')
                .addToUi();
        }
    }

    setupFullMenu() {
        this.menu
            .addItem('Update All', 'updateAll')
            .addSeparator()
            .addItem('Update User', 'updateUser')
            .addToUi();
    }

    askForAccessToken() {
        this.interface.alert('WaniKani Access Token Required', 'Please enter a valid WaniKani Access Token in Column B2 of sheet WaniKani API', this.interface.ButtonSet.OK);
    }
}