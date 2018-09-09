module.exports = class ParseItem {
	constructor(element) {
		this.element = element;
	}

	toJSON() {
		throw new Error("Need implement!");
	}
}