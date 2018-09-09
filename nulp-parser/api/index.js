const fetchers = require('./fetchers');
const parsers = require('./parsers');


exports.getShedule = function(group) {
	// if (['з', 'З'].indexOf(group[group.length - 1])) {
	// 	return fetchers.fetchPartTime('All', group).then(parsers.parseShedule);
	// }
	return fetchers.fetchFullTime('All', group).then(parsers.parseShedule);
};
