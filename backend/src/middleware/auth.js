const jwt = require('jsonwebtoken');
const User = require('../models/User');

let auth = async(req, res, next) => {
    // 토큰을 request headers에서 가져오기
    const authHeader = req.headers['authorization'];
        console.log("authHeader:", authHeader);
    // 토큰 부분을 분리해줘야함
    // 스페이스를 기준으로 나누고, 첫 번째 인덱스 값이 token값이 된다
    const token = authHeader && authHeader.split(' ')[1];
    console.log("token:", token);
    // token 값이 잡히지 않을 경우
    if(token === null){
        return res.sendStatus(401);    
    }

    try {
        // 토큰이 있으나 해당 토큰이 유효한 토큰인지 확인이 필요함
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ "_id": decode.userId });

        // user에서 id 값이 없을 경우
        if(!user){
            return res.status(400).send('존재하지 않는 유저입니다.');
        }

        req.user = user;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = auth;