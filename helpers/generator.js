const emoji = require('node-emoji');
const baseUrl = "https://I ❤️ 🍕.ws/";

function r(){
	return emoji.random().emoji;
}

module.exports = () => {
	return `${baseUrl}${r()}${r()}${r()}`;
};