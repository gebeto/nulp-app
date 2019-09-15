function dateToShortString(date) {
	return date
		.toISOString()
		.replace(/-/g, '')
		.split('T')[0];
}

function dateToDTSTAMP(date) {
	return date
		.toISOString()
		.replace(/\.\d+/, '')
		.replace(/(:|-)/g, '');
}


function DTSTAMPToDate(string) {
	return new Date(
		string.replace(
			/(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z/,
			'$1-$2-$3T$4:$5:$6Z'
		)
	); 
}


function createEvent(title, description, date) {
	const tt = dateToDTSTAMP(date);

	return `BEGIN:VEVENT
DTSTAMP:${tt}
DTSTART;VALUE=DATE:${dateToShortString(date)}
SUMMARY:${title}
DESCRIPTION:${description}
UID:gebeto-task-${tt}
END:VEVENT`;
}


exports.createEvent = createEvent;