javascript: (() => {
  /* Escape a TEXT value per RFC 5545 3.3.11. */
  const escapeText = (input) =>
    String(input ?? "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
      .replace(/\r\n|[\r\n]/g, "\\n");

  /* UTC date-time form, e.g. 20260820T053000Z. No VTIMEZONE block needed. */
  const utcStamp = (value) =>
    new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

  /* Calendar date form, taken from the RFC 3339 string so no time zone math applies. */
  const dateStamp = (dateTime) => String(dateTime).slice(0, 10).replace(/-/g, "");

  /* DTEND is exclusive for all-day events, so advance one day. */
  const dayAfter = (yyyymmdd) =>
    new Date(
      Date.UTC(
        Number(yyyymmdd.slice(0, 4)),
        Number(yyyymmdd.slice(4, 6)) - 1,
        Number(yyyymmdd.slice(6, 8)) + 1
      )
    )
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, "");

  /* Fold content lines at 75 octets per RFC 5545 3.1, without splitting a
     multi-byte character or an escape sequence. */
  const foldLine = (line) => {
    const bytes = new TextEncoder().encode(line);
    if (bytes.length <= 75) return line;
    const decoder = new TextDecoder();
    const chunks = [];
    let cut = 0;
    let limit = 75;
    while (cut < bytes.length) {
      let end = Math.min(cut + limit, bytes.length);
      if (end < bytes.length) {
        while (end > cut + 1 && (bytes[end] & 0xc0) === 0x80) end--;
        let slashes = 0;
        while (bytes[end - 1 - slashes] === 0x5c) slashes++;
        if (slashes % 2 === 1) end--;
      }
      chunks.push(decoder.decode(bytes.slice(cut, end)));
      cut = end;
      limit = 74; /* continuation lines start with a space */
    }
    return chunks.join("\r\n ");
  };

  const buildIcs = (event, eventUrl, host) => {
    let dtStart;
    let dtEnd;
    if (event.isAllDay === true) {
      const endSource = event.end?.dateTime ?? event.start.dateTime;
      dtStart = `DTSTART;VALUE=DATE:${dateStamp(event.start.dateTime)}`;
      dtEnd = `DTEND;VALUE=DATE:${dayAfter(dateStamp(endSource))}`;
    } else {
      const start = new Date(event.start.dateTime);
      const end = event.end?.dateTime
        ? new Date(event.end.dateTime)
        : new Date(start.getTime() + 3600000); /* start-only events get one hour */
      dtStart = `DTSTART:${utcStamp(start)}`;
      dtEnd = `DTEND:${utcStamp(end)}`;
    }

    const rooms = (event.facilities ?? []).map((facility) => facility.name).join(", ");
    const now = new Date();

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//tokyo-geek//garoon-to-apple//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      /* A stable UID lets a re-export update the event instead of duplicating it.
         Use the cleaned host so both access URLs produce the same UID. */
      `UID:garoon-${event.id}@${host}`,
      `DTSTAMP:${utcStamp(now)}`,
      /* A rising SEQUENCE tells Apple Calendar the re-export is the newer copy. */
      `SEQUENCE:${Math.floor(now.getTime() / 60000)}`,
      dtStart,
      dtEnd,
      `SUMMARY:${escapeText(event.subject)}`,
      /* The Garoon link belongs here and nowhere else. URL is a URI value, not
         TEXT, so it is not escaped, and it is kept out of DESCRIPTION so the
         memo stays the memo. */
      `URL:${eventUrl}`,
    ];
    if (event.notes) lines.push(`DESCRIPTION:${escapeText(event.notes)}`);
    if (rooms) lines.push(`LOCATION:${escapeText(rooms)}`);
    lines.push("END:VEVENT", "END:VCALENDAR");

    return lines.map(foldLine).join("\r\n") + "\r\n";
  };

  const download = (ics, fileName) => {
    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const objectUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = objectUrl;
    anchor.download = fileName;
    document.body.append(anchor);
    anchor.click();
    anchor.remove();
    setTimeout(() => URL.revokeObjectURL(objectUrl), 10000);
  };

  try {
    const event = window.garoon?.schedule?.event?.get();

    if (!event?.start?.dateTime) {
      alert(`Error: Not on a Garoon event.\nPlease open a specific Garoon event.`);
      return;
    }

    /* Client certificate authentication inserts ".s" into the host name. */
    const origin = location.origin.replace(".s.", ".");
    const eventUrl = `${origin}${location.pathname}?event=${event.id}`;
    const ics = buildIcs(event, eventUrl, location.hostname.replace(".s.", "."));

    console.log({ event, ics });
    download(ics, `garoon-${event.id}.ics`);
  } catch (error) {
    console.error(error);
    alert(`Error: Could not build the iCal file.\n${error.message}`);
  }
})();
