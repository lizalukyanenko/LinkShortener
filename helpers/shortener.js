const generator = require('./generator');
const db = require('./db');

async function shortener(address, user) {
	let dbAddress = await db.findAddress(address);
	if (!dbAddress){
		const shortUrl = await getShortUrl();
		dbAddress = await db.saveAddress({
			original_url: address,
			short_url: shortUrl,
			author: user,
		});
		return dbAddress.short_url;
	}
	return dbAddress.short_url;
}

async function getShortUrl(){
	const shortUrl = generator();
	const longAddress = await db.findLongAddress(shortUrl);

	if (longAddress) {
	    return await getShortUrl(shortUrl)
    } else {
	    return shortUrl;
    }
}

module.exports = {
	shortener
};