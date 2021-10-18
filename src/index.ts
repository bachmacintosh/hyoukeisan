import {WaniKaniApiSheet} from "./sheets/WaniKaniApiSheet";
import {UIPromptService} from "./services/UIPromptService";
const apiSheet = new WaniKaniApiSheet;
const ui = new UIPromptService;
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen() {
  const apiSheetExists = apiSheet.checkIfExists();
  if (apiSheetExists === null) {
    apiSheet.build();
    ui.askForApiKey();
  } else {
    const apiKey = apiSheetExists.getRange('B1').getValue();
    if (apiKey === '') {
      ui.askForApiKey();
    }
  }

  apiSheet.build();
}

