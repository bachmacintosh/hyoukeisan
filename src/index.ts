import {WaniKaniApiSheet} from "./sheets/WaniKaniApiSheet";
import {User} from "./wanikani/resources/User";
import {UserSheet} from "./sheets/UserSheet";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onInstall() {
  setupSheets();
  setupMenu();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
  if(e.authMode === GoogleAppsScript.Script.AuthMode.LIMITED) {
    setupSheets();
  }
  setupMenu();
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

function setupMenu() {
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
  const user = new User;
  if (user.hasNewData) {
    const userSheet = new UserSheet;
    userSheet.update(user);
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateAll() {
  updateUser();
}