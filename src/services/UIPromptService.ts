export class UIPromptService {
    askForApiKey() {
        SpreadsheetApp.getUi().alert('Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API');
    }
}