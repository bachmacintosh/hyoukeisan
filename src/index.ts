import {WaniKaniApiSheet} from "./sheets/WaniKaniApiSheet";
import {UIService} from "./services/UIService";
const apiSheet = new WaniKaniApiSheet;
const ui = new UIService;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen() {
  if (apiSheet.sheet === null) {
    apiSheet.build();
    ui.askForApiKey();
  } else {
    if (apiSheet.getApiKey() === null) {
      ui.askForApiKey();
    }
  }
}

