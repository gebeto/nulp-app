const fetch = require('node-fetch');
const dom = require('jsdom');
const JSDOM = dom.JSDOM;


function objToUrl(obj) {
	return Object.keys(obj).map((key) => {
		return `${key}=${encodeURI(obj[key])}`;
	}).join("&");
}

function fetcher(shedule_type = "students", institute = "All", group = "All") {
	let url = `http://lpnu.ua/${shedule_type}_schedule?` + objToUrl({
		institutecode_selective: institute ? institute : '',
		edugrupabr_selective: group ? group : '',
	});
	return fetch(url).then(res => res.text());
}

function fetchPartTime(institute, group) {
	return fetcher('parttime', institute, group);
}

function fetchFullTime(institute, group) {
	return fetcher('students', institute, group);
}

function toDom(html) {
	const dom = new JSDOM(html);
	const window = dom.window;
	const document = window.document;

	return document;
}


function parseInstitutes(html) {
	const document = toDom(html)

	const select = document.querySelector('select#edit-institutecode-selective');
	const options = [...select.querySelectorAll('option')].map((option, index) => {
		return {
			"title": option.textContent,
			"value": option.value,
		};
	});
	return options;
}


function parseGroups(html) {
	const document = toDom(html)

	const select = document.querySelector('select#edit-edugrupabr-selective');
	const options = [...select.querySelectorAll('option')].map((option, index) => {
		return {
			"title": option.textContent,
			"value": option.value,
		};
	});
	return options;
}

class ParseItem {
	constructor(element) {
		this.element = element;
	}

	toJSON() {
		throw new Error("Need implement!");
	}
}

class DaySheduleItem extends ParseItem {
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

class LessonItem extends ParseItem {
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


function parseShedule(html) {
	const parser = new SheduleParser(html);
	if (parser.shedule) {
		return parser.toJSON();
	}
	return false;
}


exports.fetcher = fetcher;
exports.fetchPartTime = fetchPartTime;
exports.fetchFullTime = fetchFullTime;
exports.parseInstitutes = parseInstitutes;
exports.parseGroups = parseGroups;
exports.parseShedule = parseShedule;

exports.getShedule = function(group) {
	// if (['з', 'З'].indexOf(group[group.length - 1])) {
	// 	return fetchPartTime('All', group).then(parseShedule);
	// }
	return fetchFullTime('All', group).then(parseShedule);
};