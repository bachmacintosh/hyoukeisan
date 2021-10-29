import {WaniKaniSheetInterface} from "./WaniKaniSheetInterface";
import {User} from "../wanikani/resources/User";

export class UserSheet implements WaniKaniSheetInterface {
    public readonly sheet: GoogleAppsScript.Spreadsheet.Sheet;

    public constructor() {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User');
        if (sheet === null) {
            this.sheet = UserSheet.create();
        } else {
            this.sheet = sheet;
        }
    }

    private static create() {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
        sheet.setName('User');
        return sheet;
    }

    public build() {
        this.sheet.getRange('A1:A20').setValues([
            ['BASIC INFO'],
            ['Username:'],
            ['Profile URL:'],
            ['Level:'],
            ['Started At:'],
            ['Current Vacation Started At:'],
            [''],
            ['SUBSCRIPTION'],
            ['Active:'],
            ['Type:'],
            ['Max Level Granted:'],
            ['Period Ends At:'],
            [''],
            ['PREFERENCES'],
            ['Default Voice Actor:'],
            ['Lessons -- Autoplay Audio:'],
            ['Lessons -- Batch Size:'],
            ['Lessons -- Presentation Order:'],
            ['Reviews -- Autoplay Audio:'],
            ['Reviews -- Display SRS Indicator:']
        ]).setFontWeight('bold');
        this.sheet.autoResizeColumn(1);
    }

    public update(user: User) {
        this.sheet.getRange('B1:B20').setValues([
            [''],
            [user.data.username],
            [user.data.profile_url],
            [user.data.level],
            [user.data.started_at],
            [user.data.current_vacation_started_at],
            [''],
            [''],
            [user.data.subscription.active],
            [user.data.subscription.type],
            [user.data.subscription.max_level_granted],
            [user.data.subscription.period_ends_at],
            [''],
            [''],
            [user.data.preferences.default_voice_actor_id],
            [user.data.preferences.lessons_autoplay_audio],
            [user.data.preferences.lessons_batch_size],
            [user.data.preferences.lessons_presentation_order],
            [user.data.preferences.reviews_autoplay_audio],
            [user.data.preferences.reviews_display_srs_indicator]
        ]);
        this.sheet.autoResizeColumn(2);
    }
}