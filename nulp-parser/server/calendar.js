const ics = require('ics');

const timetable = {
	'1': [8, 30],
	'2': [10, 20],
	'3': [12, 10],
	'4': [14, 15],
	'5': [16, 00],
	'6': [17, 40],
	'7': [19, 20],
	'8': [21, 00],
};

const locations = {
	"303 XXIX н.к.": { lat: 49.8343707, lon: 24.0066812 }
};


function formatLesson(date, lesson) {
	const start = [...date, ...timetable[lesson.index]];
	return {
		start: start,
		duration: { hours: 1, minutes: 35 },
		title: lesson.title,
		// description: `${lesson.teacher}, ${lesson.type}`,
		location: `${lesson.where} - ${lesson.type} - ${lesson.teacher}`,
		// location: lesson.where,
		uid: `${lesson.title}-${date.join('-')}-${lesson.teacher}-${lesson.index}@nulp.ua`,
		geo: locations[lesson.where],
		categories: ['nulp', 'нулп'],
		status: 'CONFIRMED',
		organizer: { name: 'NULP', email: 'coffice@lpnu.ua' },
	};
}

function createDay(day) {
	const date = day.title.split("-").map(item => parseInt(item));
	return day.items.map(lesson => formatLesson(date, lesson));
}

function createSchedule(title, schedule) {
	const events = [];
	for (let day of schedule) {
		const lessons = createDay(day);
		for (let lesson of lessons) {
			events.push(lesson);
		}
	}
	const { error, value } = ics.createEvents(events);
	return value.replace('VERSION:2.0', `VERSION:2.0\nX-WR-CALNAME:${title}\nX-APPLE-CALENDAR-COLOR:#E6C800\nUID:nulp-calendar-${title}`);
}

exports.formatLesson = formatLesson;
exports.createDay = createDay;
exports.createSchedule = createSchedule;


 
// ics.createEvent(event, (error, value) => {
//   if (error) {
//     console.log(error)
//     return
//   }
 
//   console.log(value)  
//   // BEGIN:VCALENDAR
//   // VERSION:2.0
//   // CALSCALE:GREGORIAN
//   // PRODID:adamgibbons/ics
//   // METHOD:PUBLISH
//   // X-PUBLISHED-TTL:PT1H
//   // BEGIN:VEVENT
//   // UID:d9e5e080-d25e-11e8-806a-e73a41d3e47b
//   // SUMMARY:Bolder Boulder
//   // DTSTAMP:20181017T204900Z
//   // DTSTART:20180530T043000Z
//   // DESCRIPTION:Annual 10-kilometer run in Boulder\, Colorado
//   // URL:http://www.bolderboulder.com/
//   // GEO:40.0095;105.2669
//   // LOCATION:Folsom Field, University of Colorado (finish line)
//   // STATUS:CONFIRMED
//   // CATEGORIES:10k races,Memorial Day Weekend,Boulder CO
//   // ORGANIZER;CN=Admin:mailto:Race@BolderBOULDER.com
//   // ATTENDEE;RSVP=TRUE;ROLE=REQ-PARTICIPANT;PARTSTAT=ACCEPTED;CN=Adam Gibbons:mailto:adam@example.com
//   // ATTENDEE;RSVP=FALSE;ROLE=OPT-PARTICIPANT;DIR=https://linkedin.com/in/brittanyseaton;CN=Brittany
//   //   Seaton:mailto:brittany@example2.org
//   // DURATION:PT6H30M
//   // END:VEVENT
//   // END:VCALENDAR
// })

