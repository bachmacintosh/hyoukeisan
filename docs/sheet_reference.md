---
title: Sheet Reference
---

# Sheet Reference

This is a quick handy reference to the structure of all the sheets that are created/updated by Hyoukeisan.

## User

The User sheet contains basic information about the WaniKani user who owns the access token provided in the WaniKani API sheet.

| Row/Col       | A        | B |
| ------------- | --- | --- |
| 1 | **BASIC INFO** | `Blank` |
| 2 | **Username:** | `Text` A WaniKani Username |
| 3 | **Profile URL:** | `Text` A WaniKani Profile URL |
| 4 | **Level:** | `Number<Integer>` A WaniKani Level -- `1-60` |
| 5 | **Started At:** | `Number<Date>` The date the user joined WaniKani |
| 6 | **Current Vacation Started At:** | `Number<Date> OR Blank` The date a user turned on Vacation Mode in WaniKani; this cell is only populated if Vacation Mode is enabled in WaniKani |
| 7 | `Blank` | `Blank` |
| 8 | **SUBSCRIPTION** | `Blank` |
| 9 | **Active:** | `Boolean` Whether or not the user has a paid subscription to WaniKani |
| 10 | **Type:** | `Text` The type of subscription the user has -- `"free", "recurring", "lifetime"` |
| 11 | **Max Level Granted:** | `Number<Integer>` The maximum level granted by the user's subscription status -- `3` for free users, `60` for paid subscribers |
| 12 | **Period Ends At:** | `Number<Date> OR Blank` The date the paid subscription ends; this will not populate for `free` or `lifetime` subscription types |
| 13 | `Blank` | `Blank` |
| 14 | **PREFERENCES** | `Blank` |
| 15 | **Default Voice Actor:** | `Number<Integer>` The ID of the user's chosen default voice actor; see the Voice Actors table for more information |
| 16 | **Lessons -- Autoplay Audio:** | `Boolean` Whether or not to automatically play pronunciation audio for vocabulary during lessons |
| 17 | **Lessons -- Batch Size:** | `Number<Integer>` The number of subjects to include in a lesson before quizzing the user -- `3-10` |
| 18 | **Lessons -- Presentation Order:** | `Text` The described order for which to present subjects in the lesson queue -- `ascending_level_then_subject`, `shuffled`, `ascending_level_then_shuffled` |
| 19 | **Reviews -- Autoplay Audio:** | `Boolean` Whether or not to automatically play pronunciation audio for vocabulary during reviews |
| 20 | **Reviews -- Display SRS Indicator:** | `Boolean` Whether or not to show the new SRS stage after a subject has been completely answered during a review |

::: tip NOTE
The Active, Type, and Max Level Granted fields are provided for information purposes only; Hyoukeisan checks these at runtime to ensure proper access to the API per WaniKani's API Terms
:::

::: warning HEADS UP
In rare circumstances, Type field may have `unknown` as its value. **This is an anomaly that should be reported to WaniKani by [sending an email](mailto:hello@wanikani.com).**
:::

## WaniKani API

This sheet is for holding onto information for accessing the WaniKani API. It holds some user-defined settings for how to access to API, as well as some HTTP [ETags](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/ETag) so the data can be cached.

| Row/Col | A | B |
| ------- | --- | --- |
| 1 | **SETTINGS** | `Blank` |
| 2 | **WaniKani Access Token:** | `Text` a WaniKani Access Token provided by the user |
| 3 | **Fetch Private WaniKani Data:** | `Boolean` Set by the user to determine if WaniKani's private, subscriber-only data should be fetched in addition to the user's data and public WaniKani data -- default `FALSE` |
| 4 | `Blank` | `Blank` |
| 5 | **ETAGS:** | `Blank` |
| 6 | **User ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani User endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 7 | **Summary ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Summary endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 8 | **SRS ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Spaced Repetition Systems endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 9 | **Subjects ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Subjects endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 10 | **Assignments ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Assignments endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 11 | **Level Progressions ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Level Progressions endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 12 | **Resets ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Resets endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 13 | **Reviews ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Reviews endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 14 | **Review Statistics ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Review Statistics endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 15 | **Study Materials ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Study Materials endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |
| 16 | **Voice Actors ETag:** | `Text OR Blank` An HTTP Etag for tracking changes to the WaniKani Voice Actors endpoint; it's populated only after an update has run, and is only modified if newer data is found at the endpoint |

::: danger
Make sure your Google Sheet is properly restricted before setting Fetch Private WaniKani Data to `TRUE`. This data pertains mostly to WaniKani subjects including their mnemonics, hints, and relations/similarities/compositions to/from other subjects. **This data is copyrighted to WaniKani, and should only be disclosed to the owner of the provided access token. Sharing information normally only available to paid subscribers with the public may be in violation of WaniKani's Terms of Service and/or United States Copyright Laws.**
:::