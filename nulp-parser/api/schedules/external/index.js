const Parser = require('./Parser').Parser;


exports.parseSchedule = async function parseSchedule(html) {
	const parser = new Parser(html);
	if (parser.schedule) {
		return parser.toJSON();
	}
	return false;
}