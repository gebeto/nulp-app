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


function getInstitutes(html) {
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


function getGroups(html) {
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


class SheduleParser {
	constructor(html) {
		this.html = html;
		this.shedule = toDom(html).querySelector('div.view-content');
	}

	get json() {
		return this.parse(this.shedule)
	}

	parseData(dataString) {
		const data = dataString.replace(/,/g, '').split(/&nbsp;|<br>/);
		return {
			title: data[0].trim(),
			teacher: data[1].trim(),
			where: data[2].trim(),
			type: data[3].trim(),
		}
	}

	parseItems(itemsParentNode) {
		const result = [];
		const items = itemsParentNode.children;
		for (let i = 0; i < items.length; i += 2) {
			result.push({
				title: items[i].textContent,
				data: this.parseData(items[i + 1].querySelector('.group_content').innerHTML),
			});
		}
		return result;
	}

	parseDay(dayNode) {
		return {
			title: dayNode.querySelector('.view-grouping-header').textContent,
			items: this.parseItems(dayNode.querySelector('.view-grouping-content')),
		};
	}

	parse(rootNode) {
		return [...rootNode.querySelectorAll('.view-grouping')].map(this.parseDay.bind(this));
	}
}


function getShedule(html) {
	const shedule = new SheduleParser(html);
	return shedule.json;
}


exports.fetcher = fetcher;
exports.fetchPartTime = fetchPartTime;
exports.fetchFullTime = fetchFullTime;
exports.getInstitutes = getInstitutes;
exports.getGroups = getGroups;
exports.getShedule = getShedule;