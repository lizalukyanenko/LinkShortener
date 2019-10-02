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

router.post('/search', async (req, res) => {
	let findedUser;
	
	let search_addresses = await Address.find({
		original_url: {$regex: req.body.search_text}
	});

	if (req.session) {
		findedUser = await User.findById(req.session.userId);
	}
	res.render('search', {user: findedUser, addresses: search_addresses});
});

module.exports = router;