'use strict';

class WaniKaniApiSheet {
  constructor() {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
  }

  create() {
    this.sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    this.sheet.setName('WaniKani API');
  }

  build() {
    var _this$sheet, _this$sheet2;

    (_this$sheet = this.sheet) === null || _this$sheet === void 0 ? void 0 : _this$sheet.getRange('A1:A12').setValues([['WaniKani API Key:'], ['User ETag:'], ['Summary ETag:'], ['SRS ETag:'], ['Subjects ETag:'], ['Assignments ETag:'], ['Level Progressions ETag:'], ['Resets ETag:'], ['Reviews ETag:'], ['Review Statistics ETag:'], ['Study Materials ETag:'], ['Voice Actors ETag:']]).setFontWeight('bold');
    (_this$sheet2 = this.sheet) === null || _this$sheet2 === void 0 ? void 0 : _this$sheet2.autoResizeColumn(1);
  }

  getApiKey() {
    var _this$sheet3;

    return ((_this$sheet3 = this.sheet) === null || _this$sheet3 === void 0 ? void 0 : _this$sheet3.getRange('B1').getValue()) ?? '';
  }

}

class UIService {
  askForApiKey() {
    this.alert('Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API');
  }

  alert(text) {
    SpreadsheetApp.getUi().alert(text);
  }

}

function onInstall() {
  setupSheets();
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function onOpen() {
  setupSheets();
}

function setupSheets() {
  const apiSheet = new WaniKaniApiSheet();
  const ui = new UIService();

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
