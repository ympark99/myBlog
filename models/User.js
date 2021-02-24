const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type : String,
        maxlength : 50
    },
    email: {
        type : String,
        trim : true, // 공백 제거
        unique : 1 // 중복 제거
    },  
    password: {
        type : String,
        minlength : 5
    },
    lastname: {
        type : String,
        maxlength: 50
    },
    role: { // 관리자, 일반 유저 구분
        type : Number,
        default : 0
    },
    image: String,
    token: { // 유효성
        type : String
    },
    tokenExp: { // 토큰 유효 기간
        type : Number
    }
})

const User = mongoose.model('User',userSchema)

module.exports = {User}