/**
 *
 * @Description express get和post请求获取参数
 * @Author zhangli
 * @Created 2018-05-26
 * 
 */

var express = require('express')
var app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/get', function(req, res){
  console.log(req.query)
  res.send("hello world")
})
app.post('/post',function(req, res){
  console.log(req.body)
  res.setHeader('Content-Type', 'text/html')
  res.setHeader('Cookies', '1234567')
  res.send("hello world") 
})
app.listen(3000)
