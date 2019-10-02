const express = require('express');
const router = express.Router();
const db = require('../helpers/db');
const Address = require('../models/address');
const User = require('../models/user');

/* GET home page. */
router.get('/my_references', async (req, res, next) => {
	let findedUser;	
	if (req.session) {
		findedUser = await User.findById(req.session.userId);
		let my_addresses = await Address.find({author: findedUser.username});
		return res.render('my_references', {
			user: findedUser,
			my_addresses: my_addresses
		});
	}
});

router.post('/search', async (req, res) => {
	let findedUser;
	
	let search_addresses = await Address.find({
		original_url: {$regex: req.body.search_text},
		author: findedUser.username
	});

	if (req.session) {
		findedUser = await User.findById(req.session.userId);
	}
	res.render('search', {user: findedUser, addresses: search_addresses});
});

/* GET to long url */
router.get('/:id', async(req, res, next) => {
	const id = req.params.id;
	const fullUrl = `https://I ❤️ 🍕.ws/${id}`;
	const long = await db.findLongAddress(fullUrl)
	const author = User.username;
	if (!long) {
		return next();
	}
	res.writeHead(301, {
		Location: long.original_url,
		Location: author.author,
	});
	res.end();
});
module.exports = router;