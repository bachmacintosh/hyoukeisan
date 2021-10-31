# Welcome

**Hyoukeisan** is a Google Workplace Editor Add-On that lets you import your data from the [WaniKani API](https://docs.api.wanikani.com/20170710/) into a Google Sheet.

## Features

* Mocks the WaniKani API data into Google Sheets (i.e. strings are strings, booleans are booleans, JS Dates become Google Sheets Dates, etc.)
* All user data, including sensitive API key, is stored in the Google Sheet -- not on private servers
* Uses [ETags](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) to cache results and only pull in data when it's actually new
* Minimal set up -- install the Add-On to your Google account, enable it on your spreadsheet, place your API key in the sheet, and you're good to go

## Ready to Try It?

See [Getting Started](./getting_started) for info on how to install, enable, and run Hyoukeisan on your Google Sheet

