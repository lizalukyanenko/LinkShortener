var express = require('express');
var router = express.Router();
const shortener = require('../helpers/shortener');
const validUrl = require('valid-url');

router.post('/', function(req, res, next) {
	const longUrl = req.body.long_url;
if (longUrl){
	longUrl += longUrl;
}
	if (!longUrl || !validUrl.isUrl(longUrl)){
		return res.send({
			success: false,
			error: "Please provide a valid url",
		});
	} else {
		
		try{
		 	const resultUrl = shortener.shortener(longUrl);
			 return res.send({
				success: true,
				result: resultUrl,
			});
		} catch (err) {
			next(err);
		}
	}
});

module.exports = router;
