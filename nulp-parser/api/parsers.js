const toDom = require('./dom').toDom;


exports.parseInstitutes = function parseInstitutes(html) {
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


exports.parseGroups = function parseGroups(html) {
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


exports.parseShedule = require('./SheduleParser/');
