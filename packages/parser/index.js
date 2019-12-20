const fetcher = require('./schedules/fetcher');
const schedules = require('./schedules/');


exports.getFullSchedule = function getFullSchedule(group, semester = undefined) {
	return fetcher
		.fetchFullTime('All', group, semester)
		.then(schedules('full'));
};

exports.getExternalSchedule = function getExternalSchedule(group, semester = undefined) {
	return fetcher
		.fetchExternalTime('All', group, semester)
		.then(schedules('external'));
};
