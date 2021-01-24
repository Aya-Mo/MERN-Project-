const Blog = require('../models/Blog');

const create = (blog) => Blog.create(blog);
const getAll = (query) => Blog.find(query).exec();
const getlatestBlogs = () => Blog.find().sort([
    ['createdAT', -1]
]).exec();
const getById = (id) => Blog.findById(id).exec();
const editOne = (id, body) => Blog.findByIdAndUpdate(id, body, { new: true }).exec();
const deleteone = (id) => Blog.findByIdAndRemove(id).exec();

const getByTitle = ({ title }) => Blog.find({ title }).exec();
const getByTags = ({ tags }) => Blog.find({ tags }).exec();
const getByAuther = ({ auther }) => Blog.find({ auther }).exec();



module.exports = {
    create,
    getAll,
    getById,
    editOne,
    deleteone,
    getByTitle,
    getByTags,
    getByAuther,
    getlatestBlogs
};