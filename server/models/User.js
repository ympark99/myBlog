const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10; // 10자리 salt 생성
const jwt = require('jsonwebtoken');

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

// pw 비교 메소드
userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plain 비번 암호화해서 암호화된 비번과 비교
    bcrypt.compare(plainPassword, this.password , function(err,isMatch){
        if(err) return cb(err); // 에러일 경우 콜백함수에 에러 전달
        cb(null, isMatch);
    })
}

// 토큰 생성 메소드
userSchema.methods.generateToken = function(cb){
    
    var user = this;
    // jsonwebtoken 이용하여 토큰 생성
    var token = jwt.sign(user._id.toHexString(), 'secretToken') // mongoDB의 _id임

    // user._id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token
    user.save(function(err,user){
        if(err) return cb(err)
        cb(null, user) // user에 토큰 저장
    })
}

userSchema.statics.findByToken = function(token, cb){
    var user = this;

    // user._id + '' = token
    // 토큰을 decode
    jwt.verify(token, 'secretToken', function(err,decoded){
        // 유제 id 이용해서 유저를 찾은 다음
        // client의 token과 db에 보관된 토큰 일치하는지 확인
        user.findOne({"_id": decoded, "token": token}, function(err, user){
            if(err) return cb(err);
            cb(null,user)
        })        
    })
}





const User = mongoose.model('User',userSchema)

module.exports = {User}