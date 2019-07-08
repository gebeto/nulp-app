const fetch = require('node-fetch');
const BASE_URL = "http://lpnu.ua";


function objToUrl(obj) {
	return Object.keys(obj).map((key) => {
		return `${key}=${encodeURI(obj[key])}`;
	}).join("&");
}


function fetcher(shedule_url, institute = "All", group = "All") {
	let url = `${BASE_URL}/${shedule_url}?` + objToUrl({
		institutecode_selective: institute ? institute : '',
		edugrupabr_selective: group ? group : '',
	});
	return fetch(url).then(res => res.text());
}


function fetchExternalTime(institute, group) {
	return fetcher('parttime_schedule', institute, group);
}


function fetchFullTime(institute, group) {
	return fetcher('students_schedule', institute, group);
}


exports.fetcher = fetcher;
exports.fetchExternalTime = fetchExternalTime;
exports.fetchFullTime = fetchFullTime;