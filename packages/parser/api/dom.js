const dom = require('jsdom');
const JSDOM = dom.JSDOM;

exports.toDom = function toDom(html) {
	const dom = new JSDOM(html);
	const window = dom.window;
	const document = window.document;

	return document;
}