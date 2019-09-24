const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		reqired: true,
    },
    login: {
		type: String,
		reqired: true,
    },
    password: {
		type: String,
		reqired: true,
	}
}, {timestamps: true});

module.exports = mongoose.model('user', userSchema);

module.exports.hashPassword = async (password) => {
	try {
	  const salt = await bcrypt.genSalt(10);
	  return await bcrypt.hash(password, salt);
	} catch(error) {
	  throw new Error('Hashing failed', error);
	}
}