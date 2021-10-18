import {WaniKaniApiSheetBuilder} from "./builders/WaniKaniApiSheetBuilder";
import {UIPromptService} from "./services/UIPromptService";
const builder = new WaniKaniApiSheetBuilder;
const ui = new UIPromptService();
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onOpen() {
  const apiSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
  if (apiSheet === null) {
    builder.build();
    ui.askForApiKey();
  } else {
    const apiKey = apiSheet.getRange('B1').getValue();
    if (apiKey === '') {
      ui.askForApiKey();
    }
  }

  builder.build();
}

