export class UIService {
    askForApiKey() {
        this.alert('Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API');
    }
    alert(text: string) {
        SpreadsheetApp.getUi().alert(text);
    }
}