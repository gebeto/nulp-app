const toDom = require('../../dom').toDom;
const AbstractItem = require('../AbstractItem');

const FullParser = require('../full/Parser');
const LessonItem = FullParser.LessonItem;
const DayScheduleItem = FullParser.DayScheduleItem;


class Parser {
	constructor(html) {
		this.html = html;
		this.schedule = toDom(html).querySelector('div.view-content');
	}

	toJSON() {
		return this.parse(this.schedule)
	}

	parse(rootNode) {
		const nodes = rootNode.querySelectorAll('.view-grouping');
		const res = {};
		for (let i = 0; i < nodes.length; i++) {
			const data = new DayScheduleItem(nodes[i]).toJSON();
			res[data.title] = data;
		}
		return res;
	}
}


exports.Parser = Parser;