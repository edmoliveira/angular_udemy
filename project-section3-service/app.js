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

const jwt = require('jsonwebtoken');
const SECRET = "!secret@ok@!";

const userData = { 
  userId: 1,
  name: 'Bruce Wayne'
 }

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-access-token');
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

app.post('/api/login', (req, res) => {  
  if(req.body.email === 'batman@warner.com' && req.body.password === 'robin'){
    const expiresIn = 60; // expires in 5min

    const token = jwt.sign({ userData: userData }, SECRET, {
      expiresIn: expiresIn
    });

    return res.json({"success": true, "data": { id: userData.id, name: userData.name, token: token, expiresTime: expiresIn }, "error": null});
  }
  
  res.status(401).json({message: '401 Unauthorized!'});
})

app.get('/api/user', checkToken, function (req, res) {
  res.send({"success": true, "data": req.userData, "error": null});
});

app.delete('/api/ingredients', checkToken, function (req, res) {
  if(db.has(ingredientsId)) {
    db.clear(ingredientsId);
  }
	
	res.send({"success": true, "data": null, "error": null});
});

app.get('/api/ingredients', checkToken, function (req, res) {
  var data = [];

  if(db.has(ingredientsId)) {
    data = db.get(ingredientsId);
  }

  res.send({"success": true, "data": data, "error": null});
});

app.post('/api/ingredients', checkToken, function(req, res){
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

app.delete('/api/recipes', checkToken, function (req, res) {
  if(db.has(recipesId)) {
    db.clear(recipesId);
  }
	
	res.send({"success": true, "data": null, "error": null});
});

app.get('/api/recipes', checkToken, function (req, res) {
  var data = [];

  if(db.has(recipesId)) {
    data = db.get(recipesId);
  }

  res.send({"success": true, "data": data, "error": null});
});

app.post('/api/recipes', checkToken, function(req, res){
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

function checkToken(req, res, next){
  const token = req.headers['x-access-token'];

  if (!token) return res.status(401).json({ message: '401 Unauthorized!' });
  
  jwt.verify(token, SECRET, function(err, decoded) {
    
    if (err) return res.status(401).json({ message: '401 Unauthorized!' });
    
    req.userData = decoded.userData;
    next();
  });
}

app.listen(port, function () {	
  console.log('Example app listening on port 9000!');
});
