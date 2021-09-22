var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 8080;

var contents = [];

contents.push({title: 'Harry Potter e a Pedra Filosofal', content: 'Harry Potter e a Pedra Filosofal é o primeiro dos sete livros da série de fantasia Harry Potter'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Custom-Header, user-id');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.delete('/api/contents', function (req, res) {
	contents = [];
	
	res.send({"success": true, "data": contents, "error": null});
});

app.get('/api/contents', function (req, res) {
	console.log("Custom-Header:" + req.headers['custom-header'])
	console.log("User Id:" + req.headers['user-id'])
	console.log("Querys:" + JSON.stringify(req.query))

	res.send({"success": true, "data": contents, "error": null});
});

app.post('/api/contents', function(req, res){
	var result = null;
	var data = null;
	
	try{
		contents.push({title: req.body.title, content: req.body.content});
		
		result = {"success": true, "data": contents, "error": null};
	}
	catch(e){
		result = {"success": false, "data": null, "error": err.message};
	}   
	res.send(result);
});

app.listen(port, function () {	
  console.log('Example app listening on port 8080!');
});