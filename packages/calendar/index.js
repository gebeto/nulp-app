const express = require("express");

const app = express();

const fs = require("fs");

app.get("/test.ics", (req, res) => {
	console.log(new Date(), req);

	res.set({
		'Content-Type': 'text/calendar; charset=utf-8',
	})

	res.send(`BEGIN:VCALENDAR
X-WR-CALNAME:Gebeto events server
UID:gebeto-calendar-1

BEGIN:VEVENT
DTSTAMP:20190829T000037Z
DTSTART;VALUE=DATE:20190829
SUMMARY:Test 1
DESCRIPTION:Test custom server 1
UID:gebeto-task-20190829T000001Z
END:VEVENT

BEGIN:VEVENT
DTSTAMP:20190829T000002Z
DTSTART;VALUE=DATE:20190829
SUMMARY:Test 4
DESCRIPTION:Test custom server 2
UID:gebeto-task-20190829T000002Z
END:VEVENT

END:VCALENDAR`);

	res.end();
})



app.listen(5000, () => {
	console.log(' >> http://localhost:5000');
});