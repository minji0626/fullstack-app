const express = require("express");
const User = require("../models/User");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

// 회원 auth 관련 처리
router.get("/auth", auth, (req, res) => {
  return res.status(200).json({
    _id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    cart: req.user.cart,
    history: req.user.history,
  });
});

// 회원가입 관련 처리
router.post("/register", async (req, res, next) => {
  // 유저 데이터를 저장, 유저 모델 이용
  try {
    const user = new User(req.body);
    await user.save(); // 비동기라서 async 사용
    return res.sendStatus(200);
  } catch (error) {
    // 에러 처리기기
    next(error);
  }
});

// 로그인 관련 처리
router.post("/login", async (req, res, next) => {
  try {
    // 회원가입된 유저인지 확인
    // findOne 메소드를 사용해서 해당 유저가 있는지 데이터에서 찾는거
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }

    // 비밀번호 체크
    const isMatch = await user.comparePassword(req.body.password);
    if (!isMatch) {
      return res.status(400).send("Wrong Password");
    }

    // 로그인할 때 payload 안에 유저의 id를 넣어주었음
    const payload = {
      userId: user._id.toHexString(),
    };

    // 토큰 생성 후에 유저와 토큰 데이터 응답으로 보내주기
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return res.json({ user, accessToken });
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/cart", auth, async (req, res, next) => {
  try {
    // 먼저 User Collection에 해당 유저의 정보 가져오기
    const userInfo = await User.findOne({ _id: req.user._id });

    // 가져온 정보에서 카트에다가 넣으려 하는 상품이 이미 들어있는지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });
    // 상품이 이미 장바구니에 있을 경우
    if (duplicate) {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true }
      );

      return res.status(201).send(user.cart);
    }
    // 상품이 없을 때
    else {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true }
      );
      return res.status(201).send(user.cart);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
