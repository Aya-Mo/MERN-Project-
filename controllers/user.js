const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const asyncSign = promisify(jwt.sign);

const User = require('../models/User');
//resister
const create = (user) => User.create(user);

//login
const login = async({ username, password }) => {
    //get user from db
    const user = await User.findOne({ username }).exec();
    if (!user) {
        throw Error('UN_AUTHENTICATED');
    }
    //validate his Password
    const isVaildPass = user.validatePassword(password);
    if (!isVaildPass) {
        throw Error('UN_AUTHENTICATED');
    }
    const token = await asyncSign({
        username: user.username,
        id: user.id,
    }, 'SECRET_MUST_BE_COMPLEX', { expiresIn: '1d' });
    return {...user.toJSON(), token };
};
//get all users
const getAll = () => User.find({}).exec();

//get user by id
const getById = (id) => User.findById(id).exec();

//edit user
const editOne = (id, data) => User.findByIdAndUpdate(id, data, { new: true }).exec();

//following function
const follow = (id, trgetid) => User.update({ "_id": id }, {
        $push: {
            following: trgetid,
        }
    }

);

//add followers
const followers = (id, trgetid) => User.update({ "_id": trgetid }, {
    $push: {
        followers: id,
    }
});

//unfollow function
const unfollow = (id, trgetid) => User.update({ "_id": id }, {
    $pull: {
        following: trgetid,
    }
});

//remove followers
const deletefollowers = (id, trgetid) => User.update({ "_id": trgetid }, {
    $pull: {
        followers: id,
    }
});

module.exports = {
    create,
    login,
    getAll,
    getById,
    editOne,
    follow,
    followers,
    unfollow,
    deletefollowers
};