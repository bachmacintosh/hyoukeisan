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

    askForApiKey() {
        this.interface.alert('WaniKani API Key Required', 'Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API', this.interface.ButtonSet.OK);
    }
}