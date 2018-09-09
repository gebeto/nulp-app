const SheduleParser = require('./SheduleParser');

module.exports = function parseShedule(html) {
	const parser = new SheduleParser(html);
	if (parser.shedule) {
		return parser.toJSON();
	}
	return false;
}