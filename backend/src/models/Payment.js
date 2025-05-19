const {default: mongoose} = require('mongoose');

const paymentSchema = mongoose.Schema({
    // 구매한 사람
    user: {
        type: object
    },
    // 결제 정보
    data: {
        type: Array,
        default: []
    },
    // 구매한 상품
    product: {
        type: Array,
        default: []
    }
}, {timestamps: true})

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;