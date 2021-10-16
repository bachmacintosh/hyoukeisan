# wanikani-gs

A Google AppsScript to import WaniKani data into Google Sheets

| Branch  | Status        |
| ------- | ------------- |
| main    | [![CI](https://github.com/bachmacintosh/wanikani-gs/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/bachmacintosh/wanikani-gs/actions/workflows/ci.yml)  |

## Get The Google Sheet Add-On

`[a link to a published Add-On will be available at version 1.0]`

---

Anyone is free to use this software under the conditions set forth by the MIT License in the **LICENSE** file. Contributions via issues and pull requests are welcome per the **CONTRIBUTING** and **CODE_OF_CONDUCT**.

## Prerequisites

To develop this script, you will need:

* A Google Account
* A fresh Google Sheet
* A basic understanding of Google AppsScript
* NPM, TypeScript, and [clasp](https://github.com/google/clasp) installed in your environment

## Installation

1. Create a blank Google Sheet if not done already
1. Open the Sheet, and go to **Tools > Script Editor**. This will create a Google AppsScript Project that is bound to your Google Sheet; give it a recognizable Project Name in the top left corner of your screen
1. `clasp clone` your newly created project into an empty folder
1. `git clone` this repository into said folder
1. Code and test by doing a `clasp push` to your own AppsScript Project

