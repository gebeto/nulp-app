module.exports = (type) => (html) => {
	return require(`./${type}/`).parseSchedule(html);
}