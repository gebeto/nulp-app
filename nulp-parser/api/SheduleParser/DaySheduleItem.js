const LessonItem = require('./LessonItem');
const AbstractItem = require('./AbstractItem');


class DaySheduleItem extends AbstractItem {
	parseItems(itemsParentNode) {
		const result = [];
		const items = itemsParentNode.children;
		for (let i = 0; i < items.length; i += 2) {
			result.push({
				title: items[i].textContent,
				items: new LessonItem(items[i + 1]).toJSON(),
			});
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


module.exports = DaySheduleItem;