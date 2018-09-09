const getShedule = require('./api.js').getShedule

console.log('start')
getShedule('ПІ-41').then(function(shedule) {
// getShedule('ПЗ-31з').then(function(shedule) {
	console.log('res', shedule);
	console.log('day', shedule[0].items[0]);
});