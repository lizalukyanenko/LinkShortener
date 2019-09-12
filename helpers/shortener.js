
const generator = require('./generator');
const db = require('./db');

async function shortener(address) {
	let dbAddress = await db.findAddress(address);
	if (!dbAddress){
		const shortUrl = await getShortUrl(address);
		dbAddress = await db.saveAddress({
			original_url: address,
			short_url: shortUrl,
		});
		return dbAddress.short_url;
	}
	return address;	
}

async function getShortUrl(address){
	const shortUrl = generator();
	const longAddress = await db.findLongAddress(shortUrl);
	if (longAddress){
		return await getShortUrl(address);
	} else {
		return shortUrl;
	}
}

module.exports = {
	shortener,
};