const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//create user schema
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        maxLength: 20,
    },
    password: {
        type: String,
        required: true,
        minLength: 5,
    },
    following: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
    followers: [{ type: mongoose.Schema.ObjectId, ref: 'User' }],
}, {
    toJSON: {
        transform: (doc, ret, options) => {
            delete ret.password;
            return ret;
        },
    },
});
//hashing the password using bcrypt before saving
userSchema.pre('save', function preSave(next) {
    this.password = bcrypt.hashSync(this.password, 8);
    next();
});
//hashing the password using bcrypt before getting
userSchema.pre('findOneAndUpdate', function preSave(next) {
    if (!this._update.password) {
        return;
    }
    this._update.password = bcrypt.hashSync(this._update.password, 8);
    next();
});
//password validation
userSchema.methods.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
};

const usermodel = mongoose.model('User', userSchema);

module.exports = usermodel;