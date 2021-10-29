/**
 * wanikani-gs v0.1.0
 * 
 * MIT License
 * 
 * Copyright (c) 2021 Collin Bachman
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

'use strict';

class WaniKaniApiSheet {
  constructor() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');

    if (sheet === null) {
      this.sheet = WaniKaniApiSheet.create();
    } else {
      this.sheet = sheet;
    }
  }

  static create() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheet.setName('WaniKani API');
    return sheet;
  }

  build() {
    this.sheet.getRange('A1:A12').setValues([['WaniKani API Key:'], ['User ETag:'], ['Summary ETag:'], ['SRS ETag:'], ['Subjects ETag:'], ['Assignments ETag:'], ['Level Progressions ETag:'], ['Resets ETag:'], ['Reviews ETag:'], ['Review Statistics ETag:'], ['Study Materials ETag:'], ['Voice Actors ETag:']]).setFontWeight('bold');
    this.sheet.autoResizeColumn(1);
  }

  getApiKey() {
    return this.sheet.getRange('B1').getValue();
  }

  getUserEtag() {
    return this.sheet.getRange('B2').getValue();
  }

  setUserEtag(etag) {
    this.sheet.getRange('B2').setValue(etag);
  }

}

class Client {
  constructor(endpoint, etag) {
    this._baseUrl = 'https://api.wanikani.com/v2/';
    this._version = '20170710';
    this._allowedUris = ['assignments', 'level_progressions', 'resets', 'reviews', 'review_statistics', 'spaced_repetition_systems', 'study_materials', 'subjects', 'summary', 'user', 'voice_actors'];

    if (this._allowedUris.includes(endpoint)) {
      this._endpoint = endpoint;
    } else {
      throw new Error('WaniKani Client -- Invalid Endpoint');
    }

    this._etag = etag;
    this._body = {};
    this._status = 0;
  }

  fetch() {
    const response = this.get();
    const headers = response.getHeaders();

    if (response.getResponseCode() === 200) {
      this._etag = Object(headers)['ETag'];
      this._body = JSON.parse(response.getContentText());
      this._status = response.getResponseCode();
    } else {
      this._body = {
        'error': 'Error ' + response.getResponseCode()
      };
      this._status = response.getResponseCode();
    }
  }

  get() {
    const path = this._baseUrl + this._endpoint;
    const apiSheet = new WaniKaniApiSheet();
    let headers;

    if (this._etag === '') {
      headers = {
        'Authorization': 'Bearer ' + apiSheet.getApiKey(),
        'Wanikani-Revision': this._version
      };
    } else {
      headers = {
        'Authorization': 'Bearer ' + apiSheet.getApiKey(),
        'Wanikani-Revision': this._version,
        'If-None-Match': this._etag
      };
    }

    const options = {
      'headers': headers,
      'muteHttpExceptions': true
    };
    return UrlFetchApp.fetch(path, options);
  }

  get baseUrl() {
    return this._baseUrl;
  }

  get version() {
    return this._version;
  }

  get allowedUris() {
    return this._allowedUris;
  }

  get endpoint() {
    return this._endpoint;
  }

  set endpoint(endpoint) {
    if (this._allowedUris.includes(endpoint)) {
      this._endpoint = endpoint;
    } else {
      throw new Error('WaniKani Client -- Invalid Endpoint');
    }
  }

  get etag() {
    return this._etag;
  }

  set etag(etag) {
    this._etag = etag;
  }

  get body() {
    return this._body;
  }

  get status() {
    return this._status;
  }

}

class User {
  get hasNewData() {
    return this._hasNewData;
  }

  get object() {
    return this._object;
  }

  get url() {
    return this._url;
  }

  get data_updated_at() {
    return this._data_updated_at;
  }

  get data() {
    return this._data;
  }

  constructor() {
    const apiSheet = new WaniKaniApiSheet();
    const wk = new Client('user', apiSheet.getUserEtag());
    wk.fetch();

    if (wk.status === 200) {
      this._hasNewData = true;
      apiSheet.setUserEtag(wk.etag);
      const body = wk.body;
      const u = Object(body);
      const sub = Object(u.data)['subscription'];
      const prefs = Object(u.data)['preferences'];
      this._object = u.object;
      this._url = u.url;
      this._data_updated_at = u.data_updated_at;
      this._data = {
        username: Object(u.data)['username'],
        profile_url: Object(u.data)['profile_url'],
        level: Object(u.data)['level'],
        started_at: new Date(Object(u.data)['started_at']),
        current_vacation_started_at: Object(u.data)['current_vacation_started_at'],
        subscription: {
          active: Object(sub)['active'],
          type: Object(sub)['type'],
          max_level_granted: Object(sub)['max_level_granted'],
          period_ends_at: Object(sub)['period_ends_at']
        },
        preferences: {
          default_voice_actor_id: Object(prefs)['default_voice_actor_id'],
          lessons_autoplay_audio: Object(prefs)['lessons_autoplay_audio'],
          lessons_batch_size: Object(prefs)['lessons_batch_size'],
          lessons_presentation_order: Object(prefs)['lessons_presentation_order'],
          reviews_autoplay_audio: Object(prefs)['reviews_autoplay_audio'],
          reviews_display_srs_indicator: Object(prefs)['reviews_display_srs_indicator']
        }
      };
    } else {
      this._hasNewData = false;
      this._object = '';
      this._url = '';
      this._data_updated_at = null;
      this._data = {
        username: '',
        profile_url: '',
        level: 0,
        started_at: new Date(),
        current_vacation_started_at: null,
        subscription: {
          active: false,
          type: '',
          max_level_granted: 0,
          period_ends_at: null
        },
        preferences: {
          default_voice_actor_id: 0,
          lessons_autoplay_audio: false,
          lessons_batch_size: 0,
          lessons_presentation_order: '',
          reviews_autoplay_audio: false,
          reviews_display_srs_indicator: false
        }
      };
    }
  }

}

class UserSheet {
  constructor() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User');

    if (sheet === null) {
      this.sheet = UserSheet.create();
    } else {
      this.sheet = sheet;
    }
  }

  static create() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet();
    sheet.setName('User');
    return sheet;
  }

  build() {
    this.sheet.getRange('A1:A20').setValues([['BASIC INFO'], ['Username:'], ['Profile URL:'], ['Level:'], ['Started At:'], ['Current Vacation Started At:'], [''], ['SUBSCRIPTION'], ['Active:'], ['Type:'], ['Max Level Granted:'], ['Period Ends At:'], [''], ['PREFERENCES'], ['Default Voice Actor:'], ['Lessons -- Autoplay Audio:'], ['Lessons -- Batch Size:'], ['Lessons -- Presentation Order:'], ['Reviews -- Autoplay Audio:'], ['Reviews -- Display SRS Indicator:']]).setFontWeight('bold');
    this.sheet.autoResizeColumn(1);
  }

  update(user) {
    this.sheet.getRange('B1:B20').setValues([[''], [user.data.username], [user.data.profile_url], [user.data.level], [user.data.started_at], [user.data.current_vacation_started_at], [''], [''], [user.data.subscription.active], [user.data.subscription.type], [user.data.subscription.max_level_granted], [user.data.subscription.period_ends_at], [''], [''], [user.data.preferences.default_voice_actor_id], [user.data.preferences.lessons_autoplay_audio], [user.data.preferences.lessons_batch_size], [user.data.preferences.lessons_presentation_order], [user.data.preferences.reviews_autoplay_audio], [user.data.preferences.reviews_display_srs_indicator]]);
    this.sheet.autoResizeColumn(2);
  }

}

function onInstall() {
  setupSheets();
  setupMenu();
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function onOpen(e) {
  if (e.authMode === GoogleAppsScript.Script.AuthMode.LIMITED) {
    setupSheets();
  }

  setupMenu();
}

function setupSheets() {
  const apiSheet = new WaniKaniApiSheet();
  apiSheet.build();
  const userSheet = new UserSheet();
  userSheet.build();
  const apiKey = apiSheet.getApiKey();

  if (apiKey === '') {
    askForApiKey();
  }
}

function setupMenu() {
  SpreadsheetApp.getUi().createAddonMenu().addItem('Update All', 'updateAll').addSeparator().addItem('Update User', 'updateUser').addToUi();
}

function askForApiKey() {
  SpreadsheetApp.getUi().alert('Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API');
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function updateUser() {
  const user = new User();

  if (user.hasNewData) {
    const userSheet = new UserSheet();
    userSheet.update(user);
  }
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function updateAll() {
  updateUser();
}
