const fetcher = require('./schedules/fetcher');
const schedules = require('./schedules/');


exports.getFullSchedule = function getFullSchedule(group) {
	return fetcher
		.fetchFullTime('All', group)
		.then(schedules('full'));
};

exports.getExternalSchedule = function getExternalSchedule(group) {
	return fetcher
		.fetchExternalTime('All', group)
		.then(schedules('external'));
};
