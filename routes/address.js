var express = require('express');
var router = express.Router();
const shortener = require('../helpers/shortener');
const validUrl = require('valid-url');
const db = require('../helpers/db');
const User = require('../models/user');
let findedUser;

/* GET home page. */
router.get('/shorten', async (req, res, next) => {
	if (req.session) {
		findedUser = await User.findById(req.session.userId);
	}
  	return res.render('shorten', {user: findedUser});
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

router.route('/shorten')
  .get((req, res) => {
    res.render('shorten')
  }).post(async (req, res) => {
	const longUrl = req.body.long_url;
	if (!longUrl || !validUrl.isUri(longUrl)){
		return res.status(200).json({
			success: false,
			error: "Please provide a valid url"
		});
	} else {
		await shortener.shortener(longUrl, findedUser)
			.then(resultUrl => res.status(200).json({
				success: true,
				result: resultUrl
			}))
			.catch(err => {
				res.status(200).json({
					success: false
				});
			})
	}
});


module.exports = router;
