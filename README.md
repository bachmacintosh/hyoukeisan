# hyoukeisan - 表計算

A Google AppsScript to import WaniKani data into Google Sheets

Licensed under MIT License, see LICENSE for more info.

| Branch  | Status        |
| ------- | ------------- |
| main    | [![CI](https://github.com/bachmacintosh/wanikani-gs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bachmacintosh/wanikani-gs/actions/workflows/ci.yml) [![CodeQL](https://github.com/bachmacintosh/wanikani-gs/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/bachmacintosh/wanikani-gs/actions/workflows/codeql-analysis.yml) |

## Get The Google Sheet Add-On

`[a link to a published Add-On will be available at version 1.0]`

## Manual Installation

1. Create a blank Google Sheet if not done already
2. Open the Sheet, and go to **Tools > Script Editor**. This will create a Google AppsScript Project that is bound to your Google Sheet; give it a recognizable Project Name in the top left corner of your screen
3. Paste the contents of the [Pre-Compiled JavaScript](https://github.com/bachmacintosh/wanikani-gs/blob/main/build/index.js) into your `Code.gs` file
4. Copy the contents of `appsscript.json` and past into your own `appsscript.json` per [Google's instructions](https://developers.google.com/apps-script/concepts/scopes#setting_explicit_scopes) to explicitly grant all required scopes and set the script's timezone
5. Re-open your Google Sheet, and it should begin populating with empty WaniKani sheets


## For Both Installation Methods

After the Sheet is set up, [grab a read-only API Key from WaniKani](https://www.wanikani.com/settings/personal_access_tokens), and paste it into Cell B1 of the WaniKani API Sheet; it is **highly recommended** that you generate an API Key exclusively for each application to make mitigating compromised API Keys easier (especially for other applications)

---

## Development

### Prerequisites

To develop this script, you will need:

* A Google Account
* A fresh Google Sheet
* A basic understanding of Google AppsScript
* NPM, TypeScript, and [clasp](https://github.com/google/clasp) installed in your environment

1. Create a blank Google Sheet if not done already
2. Open the Sheet, and go to **Tools > Script Editor**. This will create a Google AppsScript Project that is bound to your Google Sheet; give it a recognizable Project Name in the top left corner of your screen
3. `clasp clone` your newly created project into an empty folder
4. `git clone` this repository into said folder
5. Code and test by doing a `clasp push` to your own AppsScript Project

## Contributing

Please see [SECURITY.md](https://github.com/bachmacintosh/wanikani-gs/blob/main/SECURITY.md) for reporting security vulnerabilities, and [CONTRIBUTING.md](https://github.com/bachmacintosh/wanikani-gs/blob/main/CONTRIBUTING.md) for all other contributions to the Project. All contributions should be made in line with our [Code of Conduct](https://github.com/bachmacintosh/wanikani-gs/blob/main/CODE_OF_CONDUCT.md). Thank You!