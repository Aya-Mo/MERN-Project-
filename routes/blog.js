const express = require('express');
const authMw = require('../middelwares/Auth');

const router = express();

const {
    create,
    getAll,
    getById,
    editOne,
    deleteone,
    getByTitle,
    getByTags,
    getByAuther
} = require('../controllers/blog');



router.use(authMw);

router.post('/', async(req, res, next) => {
    const { body, user: { id } } = req;
    console.log(id);
    try {
        const blog = await create({...body, auther: id });
        res.json(blog);
    } catch (e) {
        next(e);
    }
});
//post blog 
router.post('/', async(req, res, next) => {
    const { body } = req;
    try {
        const blog = await create({...body });
        res.json(blog);

    } catch (e) {
        next(e);
    }
});
//get all blogs
router.get('/', async(req, res, next) => {

    try {
        const blogs = await getAll();
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});


//edit blog
router.patch('/:id', async(req, res, next) => {
    const { params: { id }, body } = req;

    try {
        const blogs = await editOne(id, body, { new: true });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//delete blog
router.delete('/:id', async(req, res, next) => {
    const { params: { id } } = req;
    try {
        const blogs = await deleteone(id);
        res.redirect('/');
    } catch (e) {
        next(e);
    }
});
//search by id
router.get('/:id', async(req, res, next) => {
    const { params: { id } } = req;
    try {
        const blogs = await getById(id);
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//search by title
router.get('/title/:title', async(req, res, next) => {
    const { params: { title } } = req;
    try {
        const blogs = await getByTitle({ title });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//search by auther
router.get('/auther/:auther', async(req, res, next) => {
    const { params: { auther } } = req;
    try {
        const blogs = await getByAuther({ auther });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});
//search by tags
router.get('/tags/:tags', async(req, res, next) => {
    const { params: { tags } } = req;
    try {
        const blogs = await getByTags({ tags });
        res.json(blogs);
    } catch (e) {
        next(e);
    }
});

module.exports = router;