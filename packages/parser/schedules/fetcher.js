const fetch = require('node-fetch');
const BASE_URL = "http://lpnu.ua";


function objToUrl(obj) {
	return Object.keys(obj).map((key) => {
		return `${key}=${encodeURI(obj[key])}`;
	}).join("&");
}


function fetcher(shedule_url, institute = "All", group = "All", semester = 1) {
	let url = `${BASE_URL}/${shedule_url}?` + objToUrl({
		institutecode_selective: institute,
		edugrupabr_selective: group,
		semestr: semester,
	});
	return fetch(url).then(res => res.text());
}


function fetchExternalTime(institute, group, semester) {
	return fetcher('parttime_schedule', institute, group, semester);
}


function fetchFullTime(institute, group, semester) {
	return fetcher('students_schedule', institute, group, semester);
}


exports.fetcher = fetcher;
exports.fetchExternalTime = fetchExternalTime;
exports.fetchFullTime = fetchFullTime;