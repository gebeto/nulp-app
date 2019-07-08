const fetch = require('node-fetch');


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


exports.fetcher = fetcher;
exports.fetchPartTime = fetchPartTime;
exports.fetchFullTime = fetchFullTime;