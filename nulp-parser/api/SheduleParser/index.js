const SheduleParser = require('./SheduleParser');


module.exports = function parseShedule(html) {
	// return "Hello";
	const parser = new SheduleParser(html);
	if (parser.shedule) {
		return parser.toJSON();
	}
	return false;
}