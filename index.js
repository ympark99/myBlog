// mongodb+srv://youngmin:<password>@boilerplate.x4v7d.mongodb.net/myFirstDatabase?retryWrites=true&w=majority

const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const {User} = require('./models/User');

//application/x-www-form-urlencoded 분석
app.use(bodyParser.urlencoded({extended : true}));

//application/json 분석
app.use(bodyParser.json());

// 몽고 db 연결
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://youngmin:qkrdudals99@boilerplate.x4v7d.mongodb.net/boiler-plate?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology : true, useCreateIndex: true, useFindAndModify : false
}).then(() => console.log('MongoDB Connected!!'))
    .catch(err => console.log(err))



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/register',(req, res) => {

    // 회원가입 할때 필요한 정보들을 client에서 가져오면 db에 넣어준다.
    
    // id, pw 들어있음 bodyParser -> req body로 클라이언트 정보 전송
    const user = new User(req.body) 
    
    // mongoDB method   
    user.save((err,userInfo) => {
        if(err) return res.json({success : false, err})
        return res.status(200).json({
            success : true // 성공할경우 해당 메시지
        })
    })
})


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})