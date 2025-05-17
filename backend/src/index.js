const express = require('express');
const path = require('path');
const app = express();
const port = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config(); // process.env.MONGO_URI를 작동시키기 위함

app.use(cors()); 
app.use(express.json()); // 미들웨어 등록

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('연결 완료') // 연결 완료시
    })
    .catch(err => {
        console.log(err); // 오류 발생
    })

app.get('/', (req, res, next) => {
    setImmediate(() => { next (new Error('woops'));}); // throw를 통해서 보내면 서버 다운이 되고, next를 이용해서 강제로 보내야 된다
    // throw new Error('it is an error');
    // res.send('안녕하세요.1111');
});

app.post('/',(req,res) => {
    console.log(req.body);
    res.json(req.body);
})

// 회원에 관한건 여기에서 처리
app.use('/users', require('./routes/users')); 

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.send(error.message || '서버에서 에러가 발생하였습니다.');
})

app.use(express.static(path.join(__dirname,'../uploads')));
// 어디서나 접근할 수 있도록 절대 경로로 지정해주기기
// 경로 console 찍어서 확인 해보기

app.listen(port, () => {
    console.log(`${port}번에서 실행이 되었습니다.`)
});
