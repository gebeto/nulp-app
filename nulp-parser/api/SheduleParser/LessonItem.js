const AbstractItem = require('./AbstractItem');


module.exports = class LessonItem extends AbstractItem {
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
			type: data[3].trim(),
			subgroup: this.getSubGroup(types),
			fraction: this.getFraction(types),
			active: !!element.parentNode.className,
		}
	}

	toJSON() {
		const elements = this.element.querySelectorAll('.group_content');
		const res = [];
		for (let i = 0; i < elements.length; i++) {
			res.push(this._toJSON(elements[i]));
		}
		return res;
	}
}
