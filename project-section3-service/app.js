var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var port = 9000;

const nopedb = require("nope.db");
const ingredientsId = 'ingredients';
const recipesId = 'recipes';

const db = new nopedb({
  path: "database.json",
  seperator: ".",
  spaces: 2
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.delete('/api/ingredients', function (req, res) {
  if(db.has(ingredientsId)) {
    db.clear(ingredientsId);
  }
	
	res.send({"success": true, "data": null, "error": null});
});

app.get('/api/ingredients', function (req, res) {
  var data = [];

  if(db.has(ingredientsId)) {
    data = db.get(ingredientsId);
  }

  res.send({"success": true, "data": data, "error": null});
});

app.post('/api/ingredients', function(req, res){
	var result = null;
	
	try{
    db.set(ingredientsId, req.body);

		result = {"success": true, "data": db.get(ingredientsId), "error": null};
	}
	catch(e){
		result = {"success": false, "data": null, "error": e};
	}   

	res.send(result);
});

app.delete('/api/recipes', function (req, res) {
  if(db.has(recipesId)) {
    db.clear(recipesId);
  }
	
	res.send({"success": true, "data": null, "error": null});
});

app.get('/api/recipes', function (req, res) {
  var data = [];

  if(db.has(recipesId)) {
    data = db.get(recipesId);
  }

  res.send({"success": true, "data": data, "error": null});
});

app.post('/api/recipes', function(req, res){
	var result = null;
	
	try{
    db.set(recipesId, req.body);

		result = {"success": true, "data": db.get(recipesId), "error": null};
	}
	catch(e){
		result = {"success": false, "data": null, "error": e};
	}   

	res.send(result);
});

app.listen(port, function () {	
  console.log('Example app listening on port 9000!');
});
