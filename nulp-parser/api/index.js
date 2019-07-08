const fetchers = require('./fetchers');
const parsers = require('./parsers');


exports.getFullShedule = function(group) {
	return fetchers.fetchFullTime('All', group).then(parsers.parseShedule);
};

exports.getExternalShedule = function(group) {
	return fetchers.fetchFullTime('All', group).then(parsers.parseShedule);
};
