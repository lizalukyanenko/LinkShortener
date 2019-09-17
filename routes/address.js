var express = require('express');
var router = express.Router();
const shortener = require('../helpers/shortener');
const validUrl = require('valid-url');

router.post('/', async (req, res) => {
	const longUrl = req.body.long_url;
	if (!longUrl || !validUrl.isUri(longUrl)){
		return res.status(400).json({
			success: false,
			error: "Please provide a valid url"
		});
	} else {
		await shortener.shortener(longUrl)
			.then(resultUrl => res.status(200).json({
				success: true,
				result: resultUrl
			}))
			.catch(err => {
				res.status(400).json({
					success: false
				});
			})
	}
});

module.exports = router;
