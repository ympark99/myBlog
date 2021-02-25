const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 10자리 salt 생성

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

userSchema.pre('save',function(next){ // 저장 전 메소드
    var user = this;

    if(user.isModified('password')){ // pw 변경시에만
        // password 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) { //salt 생성
            if(err) return next(err) // 에러 발생시 user.save의 에러로 보냄

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash // 해시된 비번으로 교체
                next()
            });
        });
    } else{
        next()
    }
})

const User = mongoose.model('User',userSchema)

module.exports = {User}