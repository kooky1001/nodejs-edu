const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('../middlewares');
const {
  renderProfile,
  renderJoin,
  renderMain,
  renderHashtag,
} = require('../controllers/page');

const router = express.Router();

//모든 변수는 템플릿 엔진에서 공통으로 사용할 예정
router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user?.Followers?.length || 0;
  res.locals.followingCount = req.user?.Followings?.length || 0;
  res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
  next();
});

//라우터 마지막에 위치해 클라이언트에 응답을 보내는 미들웨어
// 컨트롤러
router.get('/profile', isLoggedIn, renderProfile);
router.get('/join', isNotLoggedIn, renderJoin);
router.get('/', renderMain);
router.get('/hashtag', renderHashtag);

module.exports = router;