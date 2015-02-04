var express = require("express");
var Birds = require("./models/Birds.js");
var router = express.Router();
var birds = new Birds(["Hoa", "Linh", "Long", "Nam"]);
var bodyParser = require('body-parser');


router.get("/", function(req, res) {
	res.render('birds/index', {title: 'This is title', message: req.query.error, birds: birds.get()});
});

router.post("/", function(req, res) {
	if (req.body.name != ''){
		birds.add(req.body.name);
		res.redirect('/birds');
	} else {
		res.redirect('/birds?error=Name is required');
	}
});

module.exports = router;