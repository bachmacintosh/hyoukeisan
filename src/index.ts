import {WaniKaniApiSheet} from "./sheets/WaniKaniApiSheet";
import {User} from "./wanikani/resources/User";
import {UserSheet} from "./sheets/UserSheet";
import {UI} from "./ui";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onInstall(e: GoogleAppsScript.Events.AddonOnInstall) {
  const ui = new UI;
  ui.setupDynamicMenu(e);
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen(e: GoogleAppsScript.Events.SheetsOnOpen) {
  const ui = new UI;
  ui.setupDynamicMenu(e);
}

function setupSheets() {
  const apiSheet = new WaniKaniApiSheet;
  apiSheet.build();
  const userSheet = new UserSheet;
  userSheet.build();
  const apiKey = apiSheet.getAccessToken();
  if (apiKey === '') {
    const ui = new UI();
    ui.askForAccessToken();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function enableAddOn() {
  const ui = new UI;
  ui.promptForEnable();
  if(ui.pressedButton === ui.interface.Button.YES) {
    setupSheets();
    ui.setupFullMenu();
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function updateUser() {
  const apiSheet = new WaniKaniApiSheet;
  if(apiSheet.getAccessToken() === '') {
    const ui = new UI;
    ui.askForAccessToken();
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