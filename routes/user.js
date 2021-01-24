const express = require('express');
const AuthMw = require('../middelwares/Auth');
const {
    create,
    login,
    getAll,
    getById,
    editOne,
    follow,
    followers,
    unfollow,
    deletefollowers
} = require('../controllers/user');

const router = express();
//register
router.post('/', async(req, res, next) => {
    const { body } = req;
    try {
        const user = await create(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});
//login
router.post('/login', async(req, res, next) => {
    const { body } = req;
    try {
        const user = await login(body);
        res.json(user);
    } catch (e) {
        next(e);
    }
});

router.use(AuthMw);
//get all
router.get('/', async(req, res, next) => {
    try {
        const users = await getAll();
        res.json(users);
    } catch (e) {
        next(e);
    }
});
//get by id
router.get('/:id', async(req, res, next) => {
    const { params: { id } } = req;
    try {
        const users = await getById(id);
        res.json(users);
    } catch (e) {
        next(e);
    }
});
//edit
router.patch('/:id', async(req, res, next) => {
    const { params: { id }, body } = req;
    try {
        const users = await editOne(id, body, { new: true });
        res.json(users);
    } catch (e) {
        next(e);
    }
});
//router.use(AuthMw);
//add follower
router.post('/follow/:fid', async(req, res, next) => {
    const { params: { fid }, user: { id } } = req;
    try {

        const userfollowID = await follow(id, fid);
        const userfollowIDes = await followers(id, fid);
        res.json({ userfollowID, userfollowIDes });
    } catch (e) {
        next(e);
    }
});
//remove Followers & unfollow
router.post('/unfollow/:fid', async(req, res, next) => {
    const { params: { fid }, user: { id } } = req;
    try {

        const userunfollowID = await unfollow(id, fid);
        const userunfollowersID = await deletefollowers(id, fid);
        res.json({ userunfollowID, userunfollowersID });
    } catch (e) {
        next(e);
    }
});

module.exports = router;