---
title: Getting Started
---

# Getting Started

Depending on your installation method, this should only take a few minutes at most.

## Get the Add-On

::: tip Coming in 1.0
This Add-On is currently in pre-release, but see Manual Installation for how to install it.
::::

## Manual Installation

1. Create a blank Google Sheet if not done already
2. Open the Sheet, and go to **Tools > Script Editor**. This will create a Google AppsScript Project that is bound to your Google Sheet; give it a recognizable Project Name in the top left corner of your screen
3. Paste the contents of the [Pre-Compiled JavaScript](https://github.com/bachmacintosh/wanikani-gs/blob/main/build/index.js) into your `Code.gs` file
4. Copy the contents of `appsscript.json` and past into your own `appsscript.json` per [Google's instructions](https://developers.google.com/apps-script/concepts/scopes#setting_explicit_scopes) to explicitly grant all required scopes, set the script's timezone, and allowlist the WaniKani API for fetching external data
5. Re-open your Google Sheet by refreshing the page in your browser

## After Either Install

In the Add-Ons menu in Google Sheets, you should see an entry for Hyoukeisan, with a sub-menu with an **Enable** option -- click that.

::: tip Authorization Needed
You must give permission via a Google OAuth prompt for the Add-On to run from this point forward, if you haven't already on a different Google Sheet. Hyoukeisan only needs two permissions -- to read/write data from the current spreadsheet, and to make external requests to the WaniKani API. The Add-On never stores or retrieves your data from anywhere other than these two locations, only holding it temporarily during execution. See Privacy for more details.

After authorizing the Add-On, you must click **Enable** one more time.
:::

A pop-up prompt will ask if it's okay to insert some sheets and row/column headers (see Sheets for what is inserted). If that's okay, click **Yes**. Otherwise, clicking **No** or closing the dialog will leave the Google Sheet untouched.

After the Sheet is set up, [grab a read-only Access Token from WaniKani](https://www.wanikani.com/settings/personal_access_tokens), and paste it into Cell B2 of the WaniKani API Sheet.

::: warning HEADS UP!
It is **highly recommended** that you generate an Access Token exclusively for each application to make mitigating compromised API Keys easier (especially for other applications)
:::

## First Run

Hyoukeisan's menu will have updated to give you proper options for checking for WaniKani data updates, and pulling fresh data in only when needed. For now, click the **Update All** menu item at the top of the sub-menu.

This will take a couple of minutes to run the first time; WaniKani has a large sum of data for both the user (that's you) and the required Subject data. Once complete, a dialog box will pop up to let you know.

You're now ready to start working with WaniKani's API data in your Google Sheet! See Sheets for more information about the data and its structure within each sheet.