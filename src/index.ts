import {WaniKaniApiSheet} from "./sheets/WaniKaniApiSheet";
import {User} from "./wanikani/resources/User";
import {UserSheet} from "./sheets/UserSheet";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onInstall(e: GoogleAppsScript.Events.AddonOnInstall) {
  setupSheets();
  setupMenu(e);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
  if(e.authMode === ScriptApp.AuthMode.LIMITED) {
    setupSheets();
  }
  setupMenu(e);
}

function setupSheets() {
  const apiSheet = new WaniKaniApiSheet;
  apiSheet.build();
  const userSheet = new UserSheet;
  userSheet.build();
  const apiKey = apiSheet.getApiKey();
  if (apiKey === '') {
    askForApiKey();
  }
}

function setupMenu(e: GoogleAppsScript.Events.SheetsOnOpen|GoogleAppsScript.Events.AddonOnInstall) {
  if(e.authMode === ScriptApp.AuthMode.LIMITED) {
    SpreadsheetApp.getUi().createAddonMenu()
        .addItem('Update All', 'updateAll')
        .addSeparator()
        .addItem('Update User', 'updateUser')
        .addToUi();
  } else {
    SpreadsheetApp.getUi().createAddonMenu()
        .addItem('Enable Add-On', 'enableAddOn')
        .addToUi();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function enableAddOn() {
  setupSheets();
  SpreadsheetApp.getUi().createAddonMenu()
      .addItem('Update All', 'updateAll')
      .addSeparator()
      .addItem('Update User', 'updateUser')
      .addToUi();
}

function askForApiKey() {
  SpreadsheetApp.getUi().alert('Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API');
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateUser() {
  const apiSheet = new WaniKaniApiSheet;
  if(apiSheet.getApiKey() === '') {
    askForApiKey();
  } else {
    const user = new User;
    if (user.hasNewData) {
      const userSheet = new UserSheet;
      userSheet.update(user);
    }
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateAll() {
  updateUser();
}