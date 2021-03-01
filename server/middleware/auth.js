const {User} = require('../models/User');

let auth = (req,res,next) => {
    // 인증 처리 실행

    // 1. client 쿠키에서 토큰 가져옴
    let token = req.cookies.x_auth;

    // 2. 복호화 후 유저 찾기
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({isAuth : false, error : true})

        req.token = token;
        req.user = user;
        next();
    })
    // 3. 유저 있으면 인증 ok
    // 없으면 인증 실패
}

module.exports = {auth};