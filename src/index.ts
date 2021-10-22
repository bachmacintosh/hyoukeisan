import {WaniKaniApiSheet} from "./sheets/WaniKaniApiSheet";
import {UIService} from "./services/UIService";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onInstall() {
  setupSheets();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen() {
  setupSheets();
}

function setupSheets() {
  const apiSheet = new WaniKaniApiSheet;
  const ui = new UIService;

  if (apiSheet.sheet === null) {
    apiSheet.create();
    apiSheet.build();
    ui.askForApiKey();
  } else {
    if (apiSheet.getApiKey() === '') {
      ui.askForApiKey();
    }
  }
}

