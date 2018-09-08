const getShedule = require('./api.js').getShedule

console.log('start')
getShedule('ПІ-41').then(function(shedule) {
	console.log('res', shedule[1].items[3]);
});