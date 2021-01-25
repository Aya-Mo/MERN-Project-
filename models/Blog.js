const mongoose = require('mongoose');
const { Schema } = mongoose;

//create Blogs schema
const blogschema = new Schema({
    title: {
        type: String,
        required: true,
    },
    tags: [String],
    body: {
        type: String,
        required: true,
    },
    photo: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    //link the blog with it's auther
    auther: {
        type: Schema.ObjectId,
        ref: 'users'
    }


});
const blogmodel = mongoose.model('blog', blogschema);

module.exports = blogmodel;