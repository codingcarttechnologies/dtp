var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = express.Router();
var d = new Date();

console.log(d);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

   
    res.setHeader('Access-Control-Allow-Credentials', true);

    next();
});

router.get('/activeissue', function(req, res) {

	res.json([
		[d.setDate(d.getDate()),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)],
		[d.setDate(d.getDate()+1),(Math.floor(Math.random() * 5) + 1)]
	]);
});

/* GET home page. */
router.get('/activeissue-realtime', function(req, res) {

  res.json([d.setDate(d.getDate()+4),(Math.floor(Math.random() * 5) + 1)]);
});





app.use('/',router)

app.listen(8000,function(){
  console.log('server run 8000 ');
})
