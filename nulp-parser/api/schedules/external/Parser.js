const toDom = require('../../dom').toDom;
const AbstractItem = require('../AbstractItem');


function parseLesson(rootElement, index) {
	const element = rootElement.querySelector('.group_content');
	const dataString = element.innerHTML
	const data = dataString.replace(/,/g, '').split(/&nbsp;|<br>/);
	const types = element.parentNode.id.split('_');
	return {
		index: index,
		title: data[0].trim(),
		teacher: data[1].trim(),
		where: data[2].trim(),
		type: data[3].trim().toLowerCase(),
		active: !!element.parentNode.className,
	};
}


function parseDay(element) {
	const itemsParentNode = element.querySelector('.view-grouping-content');
	// const items = itemsParentNode.querySelectorAll('.stud_schedule');
	const items = itemsParentNode.children;
	// const result = {};
	const result = [];
	for (let i = 1; i < items.length; i+=2) {
		const lesson = new parseLesson(items[i], items[i - 1].innerHTML);
		// result[items[i - 1].innerHTML + '. ' + lesson.title] = lesson;
		result.push(lesson);
	}
	return {
		title: element.querySelector('.view-grouping-header').textContent,
		items: result,
	}
}


function parseSchedule(html) {
	const rootNode = toDom(html).querySelector('div.view-content');
	const daysElements = rootNode.querySelectorAll('.view-grouping');
	// const result = {};
	const result = [];
	for (let i = 0; i < daysElements.length; i++) {
		const day = daysElements[i];
		const data = parseDay(day);
		// result[data.title] = data;
		result.push(data);
	}
	return result;
}


exports.Parser = parseSchedule;