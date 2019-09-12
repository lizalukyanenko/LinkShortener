const emodji = require('node-emoji');
const baseUrl = "https://I ❤️ 🍕.ws/";

function r(){
	return emodji.random().emodji;
}

module.exports = () => {
	return `${baseUrl}${r()}${r()}${r()}`;
};