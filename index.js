/**
 * Created by admin on 2017/9/23.
 */
var express = require('express')
var app  = express()
app.use(express.static('public'))



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



app.listen(3001)