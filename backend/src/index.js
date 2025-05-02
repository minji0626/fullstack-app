const express = require('express');
const path = require('path');
const app = express();
const port = 4000;

app.get('/', (req, res) => {
    res.send('안녕하세요.1111');
});

app.use(express.static(path.join(__dirname,'../uploads')));
// 어디서나 접근할 수 있도록 절대 경로로 지정해주기기
// 경로 console 찍어서 확인 해보기


app.listen(port, () => {
    console.log(`${port}번에서 실행이 되었습니다.`)
});


// const PORT = 8080;
// const HOST = '0.0.0.0';

// const app = express();
// app.get('/', (req, res) => {
//     res.send('안녕하세요');
// });

// app.listen(PORT, HOST);
// console.log(`Running on http://${HOST}:${PORT}`)