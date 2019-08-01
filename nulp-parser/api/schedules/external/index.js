const Parser = require('./Parser').Parser;


exports.parseSchedule = async function parseSchedule(html) {
	return Parser(html);
}