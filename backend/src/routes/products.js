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

const upload = multer({ storage: storage }).single('file')

router.post('/image', auth, async (req, res, next) => {

    upload(req, res, err => {
        if (err) {
            return req.status(500).send(err);
        }
        return res.json({ fileName: res.req.file.filename })
    })

})

router.get('/:id', async (req, res, next) => {

    const type = req.query.type;
    let productIds = req.params.id;

if(type === 'array') {
    // id=32423423423,345345345345345,345345345
    // productIds = ['32423423423', '345345345345345345', '345345345345345']

    let ids = productIds.split(',');
    productIds = ids.map(item => {
        return item
    })
}


    // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져옵니다.
    try {
        const product = await Product
            .find({ _id: { $in: productIds } })
            .populate('writer');

        return res.status(200).send(product);

    } catch (error) {
        next(error);
    }

})




router.get('/', async (req, res, next) => {
    // asc 오름차순  , desc 내림차순
    const order = req.query.order ? req.query.order : 'desc';
    const sortBy = req.query.sortBy ? req.query.sortBy : '_id';
    const limit = req.query.limit ? Number(req.query.limit) : 20;
    const skip = req.query.skip ? Number(req.query.skip) : 0;
    const term = req.query.searchTerm;

    let findArgs = {};
    for (let key in req.query.filters) {
        if (req.query.filters[key].length > 0) {
            if (key === "price") {
                findArgs[key] = {
                    //Greater than equal
                    $gte: req.query.filters[key][0],
                    //Less than equal
                    $lte: req.query.filters[key][1]
                }
            } else {
                findArgs[key] = req.query.filters[key];
            }
        }
    }

    if (term) {
        findArgs["$text"] = { $search: term };
    }

    console.log(findArgs);


    try {
        const products = await Product.find(findArgs)
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)

        const productsTotal = await Product.countDocuments(findArgs);
        const hasMore = skip + limit < productsTotal ? true : false;

        return res.status(200).json({
            products,
            hasMore
        })

    } catch (error) {
        next(error);
    }
})



router.post('/', auth, async (req, res, next) => {
    try {
        const product = new Product(req.body);
        product.save();
        return res.sendStatus(201);
    } catch (error) {
        next(error);
    }
})


module.exports = router
