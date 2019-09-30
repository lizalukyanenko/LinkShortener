const express = require('express');
const router = express.Router();
const db = require('../helpers/db');
const User = require('../models/user');

/* GET home page. */
router.get('/', async (req, res, next) => {
	let findedUser;

	if (req.session) {
		findedUser = await User.findById(req.session.userId);
	}

  	return res.render('index', {user: findedUser});
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