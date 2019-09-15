const express = require('express');
const renderFile = require('ejs').renderFile;
const path = require('path');

const parser = require('nulp-parser');
const calendar = require('nulp-calendar');

const PORT = process.env.PORT || 5000;
const app = express();

app.engine('html', renderFile);
app.set('view engine', 'html');


app.get('/api/schedule/full/:group', function(req, res) {
	parser.getFullSchedule(req.params.group).then((data) => {
		res.send({
			response: {
				count: data.length,
				items: data,
			}
		})
	});
});


app.get('/api/schedule/external/:group', function(req, res) {
	parser.getExternalSchedule(req.params.group).then((data) => {
		res.send({
			response: {
				count: data.length,
				items: data,
			}
		})
	});
});


app.get('/api/schedule/external/ics/:group', function(req, res) {
	parser.getExternalSchedule(req.params.group).then((data) => {
		res.set({ 'Content-Type': 'text/calendar; charset=utf-8', });
		const schedule = calendar.createSchedule(`НУЛП ${req.params.group}`, data)
		res.send(schedule);
	});
});


app.get('*', function(req, res) {
	res.render(path.resolve(__dirname, 'static/index.html'), {
		hostname: req.headers.host || "asdas"
	});
});


app.listen(PORT, function() {
	console.log(`Started on ${PORT} port.`);
})