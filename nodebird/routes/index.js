const express = require("express");

const router = express.Router();

//모든 변수는 템플릿 엔진에서 공통으로 사용할 예정
router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followingIdList = [];
  next();
});

//라우터 마지막에 위치해 클라이언트에 응답을 보내는 미들웨어
// 컨트롤러
// router.get("/profile", renderProfile);
// router.get("/join", renderJoin);
router.get("/", (req, res, next) => {
    try {
        res.send('접속성공!!!');
    } catch(e) {
        next(e);
    }
});

module.exports = router;