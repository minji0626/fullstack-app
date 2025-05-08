const express = require('express');
const User = require('../models/User');
const router = express.Router();


// 회원가입 관련 처리
router.post('/register', async(req, res, next) => {
    // 유저 데이터를 저장, 유저 모델 이용
    try {
        const user = new User(req.body);
        await user.save(); // 비동기라서 async 사용
        return res.sendStatus(200);
    } catch (error) { // 에러 처리기기
        next(error);
    }
})

// 로그인 관련 처리
router.post('/login',(req,res) => {
    
})


// 회원 auth 관련 처리
router.post('/auth',(req,res) => {

})

module.exports = router;