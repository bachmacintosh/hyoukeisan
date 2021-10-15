function onOpen(e) {
  const apiSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
  if (apiSheet === null) {
    createApiSheet();
  }
  const apiKey = apiSheet.getRange('B1').getValue();
  if (apiKey === '') {
    askForApiKey();
  }
}

function createApiSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
  sheet.setName('WaniKani API');
  sheet.getRange('A1:A2').setValues([
      ['WaniKani API Key:'],
      ['ETag:']
  ]).setFontWeight('bold');
  sheet.autoResizeColumn(1);
  askForApiKey();
}

function askForApiKey(){
  SpreadsheetApp.getUi().alert('Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API');
}

