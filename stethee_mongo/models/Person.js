const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w]{2,4})?$/;
const UserSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    createdDate: {type: Number, default: new Date().getTime()},
    updatedDate: {type: Number},
    email: {
        type: String,
        validate: {
            validator: (email) => emailRegex.test(email),
            message: "Email format invalid"
        },
        required: true
    },
    gender: {
        type: String,
        validate: {
            validator: (gender) => gender.toLowerCase() === 'male' || gender.toLowerCase() === 'female',
            message: "Invalid value, only Female or Male"
        }
    },
    phoneNumber: Number,

});

const User = mongoose.model('user', UserSchema);

module.exports = User;
