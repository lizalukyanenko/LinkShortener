const express = require('express');
const router = express.Router();
const db = require('../helpers/db');
const Address = require('../models/address');
const User = require('../models/user');

/* GET home page. */
router.get('/', async (req, res, next) => {
	let findedUser;
	let addresses = await Address.find();
	if (req.session) {
		// if(req.body.search_text){
		// 	let my_addresses = await Address.find({
		// 		original_url: ".*" + req.body.search_text + ".*"
		// 	});
		// }
		findedUser = await User.findById(req.session.userId);
	
		return res.render('index', {
			user: findedUser,
			addresses: addresses
		});
	}
});

/* GET to long url */
router.get('/:id', async(req, res, next) => {
	const id = req.params.id;
	const fullUrl = `https://I ❤️ 🍕.ws/${id}`;
	const long = await db.findLongAddress(fullUrl);
	if (!long) {
		return next();
	}
	res.writeHead(301, {
		Location: long.original_url
	});
	res.end();
});

router.get('/', async (req, res) => {
	let my_addresses = await Address.find({
		original_url: req.body.search_text
	});
	console.log(my_addresses);
	res.render('index', {my_addresses});
});

module.exports = router;