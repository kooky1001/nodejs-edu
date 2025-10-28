const express = require('express');
const { test, searchByHashtag, getMyPosts, renderMain } = require('../controllers');

const router = express.Router();

// POST /test
router.get('/test', test);

router.get('/myposts', getMyPosts);

router.get('/search/:hashtag', searchByHashtag);

router.get('/', renderMain);

module.exports = router;
