---
title: Export a Garoon event to Apple Calendar with a bookmarklet
description: A bookmarklet that turns the open Garoon event into an iCal file you can import into Apple Calendar, with a full breakdown of the code.
head:
  - - meta
    - name: keywords
      content: garoon, apple calendar, bookmarklet, javascript, ical, calendar, cybozu
externalPostUrl: https://dev.to/ahandsel/import-a-garoon-event-to-apple-calendar-bookmarklet-cj0
localization: sync
---

# {{$frontmatter.title}}

{{$frontmatter.description}}

[[toc]]

Copying and pasting event details from Garoon into Apple Calendar is tedious.
This bookmarklet generates an iCal file from any open Garoon event, so the event details carry over in one click.

![Bookmarklet demo of exporting a Garoon event to Apple Calendar][img-demo]


## Usage


### Initial setup

1. Copy the [bookmarklet code](#bookmarklet-code) below.
2. Enter `@bookmarks` in Chrome's address bar.
3. Click the `⋮` icon at the top-right corner.
4. Click **Add new bookmark** and paste the code into the URL field.


### Export a Garoon event to Apple Calendar

1. Open the Garoon event's page.
2. Click the bookmarklet.
3. Download the generated iCal file.
4. Open the file and confirm that the event is now in the Apple Calendar app.


### Troubleshooting

If nothing happens after clicking the bookmarklet, check the browser console for an error message:

1. Open the browser console.
   * Mac: `Command+Option+C`
   * Windows, Linux, and Chrome OS: `Control+Shift+C`
2. Read the logged `event` object and error message.


## Bookmarklet code

<<< @/public/garoon-to-apple/garoon-to-apple-bookmarklet-v0.js


## What is a bookmarklet

A bookmarklet is a small piece of JavaScript code stored as a bookmark in a web browser.

Clicking it runs the code against the current web page, which makes it an easy way to extend the browser's functionality without installing an extension.


## Code breakdown


### Wrap the code in an IIFE

First, specify `javascript` as the language of the code.

Then, wrap the code in an [immediately invoked function expression (IIFE)][iife].
Bookmarklets run in the global scope, so the wrapper keeps the script's variables out of the page's global scope.

```javascript
javascript: (() => {
  // ... (code snippet)
  addCalendar(event);
})();
```


### Get the Garoon event object

Use the [`garoon.schedule.event.get()`][garoon-event-get] JavaScript API to get the event object of the open Garoon event.

The [`window` web API][window-api] makes the `garoon` object reachable from the global scope.

```javascript
const event = window.garoon?.schedule?.event?.get();
```


### Verify the input

Before continuing, verify that the `event` object is not `undefined`, which confirms that the open page is a Garoon event page.

```javascript
const event = window.garoon?.schedule?.event?.get();

if (event === undefined) {
  alert(`Error: Not on a Garoon schedule.\nPlease open a specific Garoon event.`);
  return;
}
```


### Main function - addCalendar

The `addCalendar` function takes an `event` object as an argument and performs several operations to build a URL.
Opening that URL populates the fields of a new Apple Calendar event.


### Format the start and end times

Call the `formatTimestamp` helper function to convert the event's start and end date-time strings into the required format.

```javascript
const start = formatTimestamp(event.start.dateTime);
const end = formatTimestamp(event.end.dateTime);
```

The `formatTimestamp` function takes the date string, formats it to ISO 8601, then strips the hyphens and colons.

```javascript
const formatTimestamp = (dateString) =>
  new Date(dateString).toISOString().replaceAll(/[-:]|\.\d+/g, '');
```


### Modify the origin URL

Use `location.origin` to get the [origin][origin] URL of the current page.

The [client certificate authentication][client-cert-auth] feature modifies the URL by adding a `.s` between the subdomain and the domain, so remove it before exporting.

```javascript
const origin = location.origin.replace(".s.", ".");
```


### Construct the event URL

Generate a short, clean URL for the event by combining the origin URL with the event ID.

```javascript
const url = `${origin}${location.pathname}?event=${event.id}`;
```


### Initialize the URL parameters

Initialize a `URLSearchParams` object and set the service to `apple`.

```javascript
const params = new URLSearchParams({ service: "apple" });
```


### Format the event notes

Call the `bodyFormat` helper function to convert the event notes into the format Calndr expects.

```javascript
const body = bodyFormat(event.notes);
```

The function takes the string and replaces every newline with a carriage return.

```javascript
const bodyFormat = (inputText) => inputText.replace(/\n/g, '\r');
```


### Set the URL parameters

Populate the parameters needed for the Apple Calendar event.

```javascript
params.set("start", start);
params.set("end", end);
params.set("title", event.subject);
params.set("description", body);
params.set("location", url);
params.set("timezone", event.start.timeZone);
params.set("calname", `${start}-${event.id}`);
```


### Handle all-day events

An earlier version of the bookmarklet passed an `all_day` parameter for all-day events.

```javascript
if (event.isAllDay) {
  params.set("all_day", "true");
}
```

> [!CAUTION] Caution: Calndr returns an error when the `all_day` parameter is set to either `true` or `false`.
> This was confirmed on January 17, 2024, so the bookmarklet above leaves the parameter out.


### Create and open the calendar event URL

[calndr.link][calndr] is a free calendar link generator created by [atymic][atymic].

Pass the parameters to Calndr's [dynamic API][calndr-api] to download the iCal file.

```javascript
open(`https://calndr.link/d/event/?${params.toString()}`);
```


### Log for debugging

To help with debugging, log the `event` object and the `params` object to the console so that the input and the output of the script are visible.

```javascript
console.log({ event });
// ...
console.log(params.toString());
```


## Support the calndr.link project

The bookmarklet relies on Calndr to build the iCal file.
Consider [buying atymic a coffee][calndr-kofi] for creating [calndr.link][calndr].


## References

* [Dynamic API - Calndr][calndr-api]
* [Schedule object - cybozu developer network][garoon-schedule-object]
* [Get the schedule event - cybozu developer network][garoon-event-get]
* [RFC 5545 - Internet calendaring and scheduling core object specification (iCalendar)][rfc-5545]
* [garoon-to-apple-bookmarklet-v0.js - GitHub][source-code]
* Originally published on [DEV][devto-original] and [Qiita][qiita-ja].

<!-- Links -->

[atymic]: https://atymic.dev/
[calndr]: https://calndr.link/
[calndr-api]: https://calndr.link/api-docs#dynamic
[calndr-kofi]: https://ko-fi.com/slashdev
[client-cert-auth]: https://jp.cybozu.help/general/en/id/02047.html#list_access_secureaccess_10
[devto-original]: https://dev.to/ahandsel/import-a-garoon-event-to-apple-calendar-bookmarklet-cj0
[garoon-event-get]: https://cybozu.dev/ja/garoon/docs/js-api/schedule/get-schedule-event/
[garoon-schedule-object]: https://cybozu.dev/ja/garoon/docs/overview/schedule-object/
[iife]: https://developer.mozilla.org/en-US/docs/Glossary/IIFE
[origin]: https://developer.mozilla.org/en-US/docs/Glossary/Origin
[qiita-ja]: https://qiita.com/ahandsel/items/18308ff3a6daad9029a4
[rfc-5545]: https://datatracker.ietf.org/doc/html/rfc5545
[source-code]: https://github.com/ahandsel/articles/blob/main/garoon-to-apple/garoon-to-apple-bookmarklet-v0.js
[window-api]: https://developer.mozilla.org/en-US/docs/Web/API/Window

<!-- Image links -->

[img-demo]: /garoon-to-apple/garoon-to-apple-bookmarklet-demo.gif
