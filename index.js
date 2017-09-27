/**
 * Created by admin on 2017/9/23.
 */
var express = require('express')
var app  = express()
app.use(express.static('public'))

//验证码
var sms_util=require('./sms_util')
//随机数字
var randomCode=sms_util.randomCode
//发送验证码
var sendCode=sms_util.sendCode

var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:false}));

//获取验证码
app.post('/yanzhengma',function (req,res) {
    var code=randomCode(6)
    var phone=req.body.phone
    console.log(phone)
    sendCode(phone,code,function (success) {
        
    })
    res.json(code)
})


//引入数据
var data=require("./data/shuju.json")

//返回请求
app.get('/index',function (req,res) {
    res.json(data)
})

//第一个页面发送请求，保存发送请求参数，传递给第二个页面
var indexOne=0
var indexTwo=0
var indexThree=0
app.get('/serve',function (req,res) {
    var home=req.query
    indexOne=home.one
    indexTwo=home.two
    indexThree=home.three
    /*console.log(indexOne,indexTwo,indexThree)*/
    res.send('成功')
})

//第二个页面发请求，响应返回数据
app.get('/serveDetail',function (req,res) {
    var serveDetail=data.second[indexOne][indexTwo][indexThree]
    var first_item=data.first[indexOne]
    var third=data.third
    res.json({
        serveDetail:serveDetail,
        first_item:first_item,
        third:third
    })
})


//注册手机号
app.post('/register',function (req,res) {
    //注册输入
    var user_phone=req.body.user
    var password_reg=req.body.password
    console.log(user_phone,password_reg)
    res.send('成功')
})



app.listen(3001)