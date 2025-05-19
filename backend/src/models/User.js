const {default: mongoose} = require('mongoose');
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxLength: 50
    },
    email: {
        type: String,
        trim: true,
        unique: true
    },
    password:{
        type: String,
        minLength: 5
    },
    role:{
        type: Number,
        default: 0
    },
    cart:{
        type: Array,
        default: []
    },
    history: {
        type: Array,
        default: []
    },
    image: String
})

userSchema.pre('save', async function(next){
    let user = this; // user의 데이터가 들어감

    if(user.isModified('password')){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }

    next();
})

// 비밀번호 체크
                                                    // 기존의 비밀번호호
userSchema.methods.comparePassword = async function (plainPassword) {
    let user = this;                    // 비밀번호 비교
    const match = await bcrypt.compare(plainPassword, user.password);
    return match;
}

const User = mongoose.model("User", userSchema);

module.exports = User;