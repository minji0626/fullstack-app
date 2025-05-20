const {default: mongoose, Schema} = require('mongoose');

const productSchema = mongoose.Schema({
    // user가 작성하기 때문에 User 에서 ref받아 가져온다.
    writer: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        maxLength: 30
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        default: 0
    },
    images: {
        type: Array,
        default: []
    },
    sold: {
        type: Number,
        maxLength: 100,
        default: 0
    },
    continents: {
        type: Number,
        default: 1
    },
    views: {
        type: Number,
        default: 0
    }
}, {timestamps: true})

const Product = mongoose.model("Product", productSchema);

module.exports = Product;