const express = require('express');
const Product = require('../models/Product');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('multer');

// 파일 업로드해서 uploads 폴더에 저장하는것것
const storage = multer.diskStorage({
    // 경로
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    // 파일 이름
    filename: function (req, file, cb) {
    const timestamp = Date.now();

    // 파일 확장자 분리
    const ext = file.originalname.substring(file.originalname.lastIndexOf('.'));
    
    // 파일 이름에서 한글 제거, 공백 및 특수문자도 제거
    const sanitized = file.originalname
      .replace(/[^a-zA-Z0-9.]/g, '') // 영어/숫자/점 제외 모두 제거
      .replace(/\s+/g, ''); // 공백 제거

    cb(null, `${timestamp}_${sanitized}`);
  }
})

const upload = multer({ storage: storage}).single("file");

router.post('/image', auth, (req,res) => {
    upload(req,res,err => {
        if(err){
            return req.status(500).send(err);
        }
        return res.json({ fileName: res.req.file.filename })
    })
})

router.get('/', async (req, res, next) => {
    try {
        const products = await Product.find().populate("writer");
        return res.status(200).json ({
            products
        })
    } catch (error) {
        next(error);
    }
})

router.post('/', auth, (req,res,next) => {
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch (error) {
        next(error);
    }
})



module.exports = router;