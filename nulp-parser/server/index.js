const express = require('express');
const renderFile = require('ejs').renderFile;
const path = require('path');

const api = require('../api');


const PORT = process.env.PORT || 5000;
const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');


app.get('/api', function(req, res) {
	api.fetchPartTime()
		.then(api.getInstitutes)
		.then((data) => {
			res.send({
				response: {
					count: data.length,
					items: data,
				}
			})
		})
});

app.get('/api/:institute', function(req, res) {
	api.fetchPartTime(req.params.institute)
		.then(api.getGroups)
		.then((data) => {
			res.send({
				response: {
					count: data.length,
					items: data,
				}
			})
		})
});

app.get('/api/:institute/:group', function(req, res) {
	api.fetchPartTime(req.params.institute, req.params.group)
		.then(api.getShedule)
		.then((data) => {
			res.send({
				response: {
					count: data.length,
					items: data,
				}
			})
		})
});

app.get('*', function(req, res) {
	// res.sendFile(path.resolve(__dirname, 'static/index.html'));
	res.render(path.resolve(__dirname, 'static/index.html'), {
		hostname: req.headers.host || "asdas"
	});
});


app.listen(PORT, function() {
	console.log(`Started on ${PORT} port.`);
})
