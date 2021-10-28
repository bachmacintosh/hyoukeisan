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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function onInstall() {
  setupSheets();
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function onOpen() {
  setupSheets();
  setupMenu();
}

function setupSheets() {
  const apiSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
  const userSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User');

  if (apiSheet === null) {
    createApiSheet();
    askForApiKey();
  } else {
    if (getApiKey() === '') {
      askForApiKey();
    }
  }

  if (userSheet === null) {
    createUserSheet();
  }
}

function setupMenu() {
  SpreadsheetApp.getUi().createAddonMenu().addItem('Update User', 'updateUser').addToUi();
}

function createApiSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet().setName('WaniKani API');
  sheet.getRange('A1:A12').setValues([['WaniKani API Key:'], ['User ETag:'], ['Summary ETag:'], ['SRS ETag:'], ['Subjects ETag:'], ['Assignments ETag:'], ['Level Progressions ETag:'], ['Resets ETag:'], ['Reviews ETag:'], ['Review Statistics ETag:'], ['Study Materials ETag:'], ['Voice Actors ETag:']]).setFontWeight('bold');
  sheet.autoResizeColumn(1);
}

function getApiKey() {
  var _SpreadsheetApp$getAc;

  return ((_SpreadsheetApp$getAc = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API')) === null || _SpreadsheetApp$getAc === void 0 ? void 0 : _SpreadsheetApp$getAc.getRange('B1').getValue()) ?? '';
}

function askForApiKey() {
  SpreadsheetApp.getUi().alert('Please enter a valid WaniKani API Key in Column B1 of sheet WaniKani API');
}

function getUserEtag() {
  var _SpreadsheetApp$getAc2;

  return (_SpreadsheetApp$getAc2 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API')) === null || _SpreadsheetApp$getAc2 === void 0 ? void 0 : _SpreadsheetApp$getAc2.getRange('B2').getValue();
}

function setUserEtag(etag) {
  var _SpreadsheetApp$getAc3;

  (_SpreadsheetApp$getAc3 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API')) === null || _SpreadsheetApp$getAc3 === void 0 ? void 0 : _SpreadsheetApp$getAc3.getRange('B2').setValue(etag);
}

function createUserSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().insertSheet().setName('User');
  sheet.getRange('A1:A20').setValues([['BASIC INFO'], ['Username:'], ['Profile URL:'], ['Level:'], ['Started At:'], ['Current Vacation Started At:'], [''], ['SUBSCRIPTION'], ['Active:'], ['Type:'], ['Max Level Granted:'], ['Period Ends At:'], [''], ['PREFERENCES'], ['Default Voice Actor:'], ['Lessons -- Autoplay Audio:'], ['Lessons -- Batch Size:'], ['Lessons -- Presentation Order:'], ['Reviews -- Autoplay Audio:'], ['Reviews -- Display SRS Indicator:']]).setFontWeight('bold');
  sheet.autoResizeColumn(1);
} // eslint-disable-next-line @typescript-eslint/no-unused-vars


function updateUser() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('User');
  const response = fetchWaniKani('user', getUserEtag());

  if (response !== undefined && response.getResponseCode() === 200) {
    const headers = response.getHeaders();
    setUserEtag(Object(headers)['ETag']);
    const user = JSON.parse(response === null || response === void 0 ? void 0 : response.getContentText());
    sheet === null || sheet === void 0 ? void 0 : sheet.getRange('B1:B20').setValues([[''], [user.data.username], [user.data.profile_url], [user.data.level], [new Date(user.data.started_at)], [user.data.current_vacation_started_at ? new Date(user.data.current_vacation_started_at) : ''], [''], [''], [user.data.subscription.active], [user.data.subscription.type], [user.data.subscription.max_level_granted], [user.data.subscription.period_ends_at ? new Date(user.data.subscription.period_ends_at) : ''], [''], [''], [user.data.preferences.default_voice_actor_id], [user.data.preferences.lessons_autoplay_audio], [user.data.preferences.lessons_batch_size], [user.data.preferences.lessons_presentation_order], [user.data.preferences.reviews_autoplay_audio], [user.data.preferences.reviews_display_srs_indicator]]);
  }
}

function fetchWaniKani(uri, etag) {
  const baseUrl = 'https://api.wanikani.com/v2/';
  const version = '20170710';
  const apiSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('WaniKani API');
  const allowedUris = ['assignments', 'level_progressions', 'resets', 'reviews', 'review_statistics', 'spaced_repetition_systems', 'study_materials', 'subjects', 'summary', 'user', 'voice_actors'];

  if (allowedUris.includes(uri)) {
    const path = baseUrl + uri;
    let headers = {};

    if (etag === '') {
      headers = {
        'Authorization': 'Bearer ' + (apiSheet === null || apiSheet === void 0 ? void 0 : apiSheet.getRange('B1').getValue()),
        'Wanikani-Revision': version
      };
    } else {
      headers = {
        'Authorization': 'Bearer ' + (apiSheet === null || apiSheet === void 0 ? void 0 : apiSheet.getRange('B1').getValue()),
        'Wanikani-Revision': version,
        'If-None-Match': etag
      };
    }

    const options = {
      'headers': headers,
      'muteHttpExceptions': true
    };
    return UrlFetchApp.fetch(path, options);
  }
}
