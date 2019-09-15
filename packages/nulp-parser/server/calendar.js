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
