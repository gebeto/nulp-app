const express = require('express');
const renderFile = require('ejs').renderFile;
const path = require('path');

const api = require('../api');


const PORT = process.env.PORT || 5000;
const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');




app.get('/api/shedule/:group', function(req, res) {
	api.getShedule(req.params.group).then((data) => {
		res.send({
			response: {
				count: data.length,
				items: data,
			}
		})
	});
});



// app.get('/api/institutes', function(req, res) {
// 	api.fetchPartTime()
// 		.then(api.parseInstitutes)
// 		.then((data) => {
// 			res.send({
// 				response: {
// 					count: data.length,
// 					items: data,
// 				}
// 			})
// 		})
// });

// app.get('/api/groups/:institute', function(req, res) {
// 	api.fetchPartTime(req.params.institute)
// 		.then(api.parseGroups)
// 		.then((data) => {
// 			res.send({
// 				response: {
// 					count: data.length,
// 					items: data,
// 				}
// 			})
// 		})
// });

// app.get('/api/:group', function(req, res) {
// 	api.fetchPartTime(req.params.group)
// 		.then(api.parseShedule)
// 		.then((data) => {
// 			res.send({
// 				response: {
// 					count: data.length,
// 					items: data,
// 				}
// 			})
// 		})
// });

app.get('*', function(req, res) {
	// res.sendFile(path.resolve(__dirname, 'static/index.html'));
	res.render(path.resolve(__dirname, 'static/index.html'), {
		hostname: req.headers.host || "asdas"
	});
});


app.listen(PORT, function() {
	console.log(`Started on ${PORT} port.`);
})
