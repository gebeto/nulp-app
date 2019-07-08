const toDom = require('../../dom').toDom;
const DayScheduleItem = require('./DayScheduleItem');


class ScheduleParser {
	constructor(html) {
		this.html = html;
		this.schedule = toDom(html).querySelector('div.view-content');
	}

	toJSON() {
		return this.parse(this.schedule)
	}

	parse(rootNode) {
		const nodes = rootNode.querySelectorAll('.view-grouping');
		const res = [];
		for (let i = 0; i < nodes.length; i++) {
			res.push(new DayScheduleItem(nodes[i]).toJSON());
		}
		return res;
	}
}


exports.parseSchedule = async function parseSchedule(html) {
	const parser = new ScheduleParser(html);
	if (parser.schedule) {
		return parser.toJSON();
	}
	return false;
}