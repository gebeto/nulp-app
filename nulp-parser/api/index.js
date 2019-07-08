const fetchers = require('./schedules/fetchers');
const parsers = require('./parsers');
const schedules = require('./schedules/');


exports.getFullSchedule = function(group) {
	return fetchers
		.fetchFullTime('All', group)
		.then(schedules('full'));
};

exports.getExternalSchedule = function(group) {
	return fetchers
		.fetchFullTime('All', group)
		.then(schedules('external'));
};