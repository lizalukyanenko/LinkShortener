const mongoose = require('mongoose');
const Address = mongoose.model('address');
const User = mongoose.model('user');

function findAuthirizedUser(login, password) {
	return User.findOne({login: login, password: password});
}

function findAddress(address) {
	return Address.findOne({original_url: address});
}

function findLongAddress(short) {
	return Address.findOne({short_url: short});
}

function saveAddress(address) {
	const newAddress = new Address(address);
	return newAddress.save();
}

module.exports = {
	findAddress,
	findLongAddress,
	saveAddress,
	findAuthirizedUser
};