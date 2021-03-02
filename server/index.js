// mongodb+srv://youngmin:<password>@boilerplate.x4v7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config/key');

const {auth} = require('./middleware/auth');
const {User} = require('./models/User');

//application/x-www-form-urlencoded 분석
app.use(bodyParser.urlencoded({extended : true}));

//application/json 분석
app.use(bodyParser.json());
app.use(cookieParser());

// 몽고 db 연결
const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true, useFindAndModify : false
}).then(() => console.log('MongoDB Connected!!'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/api/users/register',(req, res) => {

    // 회원가입 할때 필요한 정보들을 client에서 가져오면 db에 넣어준다.
    
    // id, pw 들어있음 bodyParser -> req body로 클라이언트 정보 전송
    const user = new User(req.body) 
    
    // 비밀번호 암호화


    // mongoDB method   
    user.save((err,userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true // 성공할경우 해당 메시지
        })
    })
})

app.post('/api/users/login',(req,res) => {
    // 요청된 이메일을 db에서 찾는다.
    User.findOne({ email : req.body.email }, (err,user) => {
        if(!user){ // 아이디 틀린경우
            return res.json({
                loginSuccess : false,
                message : "이메일을 다시 확인해주세요."
            })
        }

        // db에 있을 경우, pw 확인

        user.comparePassword(req.body.password , (err, isMatch) => {
            if(!isMatch) 
                return res.json({loginSuccess : false, message : "비밀번호를 다시 확인해주세요."})

            // pw 같을경우, 토큰 생성
            user.generateToken((err,user) => {
                if(err) return res.status(400).send(err); // 400 : 실패 표시

                // 토큰을 쿠키에 저장
                res.cookie("x_auth", user.token) // cookie 파일에 x_auth, 토큰으로 들어감
                .status(200) // 성공 표시
                .json({ loginSuccess : true, userId : user._id })

            })
        })   
    })
})


app.get('/api/users/auth', auth , (req,res) =>{
    // authentication 이 통과될경우 미들웨어 통과
    res.status(200).json({
        _id : req.user._id,

        // 0 -> 일반 유저, 0 아님 : 관리자
        isAdmin : req.user.role === 0? false : true,
        email : req.user.email,
        name : req.user.name,
        lastname : req.user.lastname,
        role : req.user.role,
        image : req.user.image
    })
})

app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id : req.user._id}, 
        {token : ""}
        , (err,user) => {
            if(err) return res.json({ success : false, err});
            return res.status(200).send({
                success : true
            })
        })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
