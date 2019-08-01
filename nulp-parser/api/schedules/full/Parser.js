const toDom = require('../../dom').toDom;
const AbstractItem = require('../AbstractItem');


class LessonItem extends AbstractItem {
	getSubGroup(types) {
		if (types.indexOf('1') > -1) {
			return 1
		}

		if (types.indexOf('2') > -1) {
			return 2
		}

		return false;
	}

	getFraction(types) {
		if (types.indexOf('chys') > -1) {
			return 1
		}

		if (types.indexOf('znam') > -1) {
			return 2
		}

		return 3;
	}

	_toJSON(element) {
		const dataString = element.innerHTML
		const data = dataString.replace(/,/g, '').split(/&nbsp;|<br>/);
		const types = element.parentNode.id.split('_');
		return {
			title: data[0].trim(),
			teacher: data[1].trim(),
			where: data[2].trim(),
			type: data[3].trim().toLowerCase(),
			subgroup: this.getSubGroup(types),
			fraction: this.getFraction(types),
			active: !!element.parentNode.className,
		}
	}

	toJSON() {
		const elements = this.element.querySelectorAll('.group_content');
		const res = {};
		for (let i = 0; i < elements.length; i++) {
			const data = this._toJSON(elements[i]);
			res[data.title] = data;
		}
		return res;
	}
}


class DayScheduleItem extends AbstractItem {
	parseItems(itemsParentNode) {
		const result = {};
		const items = itemsParentNode.children;
		for (let i = 0; i < items.length; i += 2) {
			result[items[i].textContent] = {
				title: items[i].textContent,
				items: new LessonItem(items[i + 1]).toJSON(),
			};
		}
		return result;
	}

	toJSON() {
		return {
			title: this.element.querySelector('.view-grouping-header').textContent,
			items: this.parseItems(this.element.querySelector('.view-grouping-content')),
		}
	}
}


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


exports.DayScheduleItem = DayScheduleItem;
exports.LessonItem = LessonItem;
exports.Parser = Parser;