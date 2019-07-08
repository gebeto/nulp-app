const toDom = require('../dom').toDom;
const DaySheduleItem = require('./DaySheduleItem');


class SheduleParser {
	constructor(html) {
		this.html = html;
		this.shedule = toDom(html).querySelector('div.view-content');
	}

	toJSON() {
		return this.parse(this.shedule)
	}

	parse(rootNode) {
		const nodes = rootNode.querySelectorAll('.view-grouping');
		const res = [];
		for (let i = 0; i < nodes.length; i++) {
			res.push(new DaySheduleItem(nodes[i]).toJSON());
		}
		return res;
	}
}


module.exports = SheduleParser;