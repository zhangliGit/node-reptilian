/**
 *
 * @Description 图片或文件上传功能
 * @Author zhangli
 * @Created 2018-05-26
 * 上传图片 完成
 * 上传文档类型 docx doc ppt pptx xlsx
 * 上传附件 .zip .rar
 */
var express = require('express')
var fs = require('fs')
var multer = require('multer')
var contentType = require('./contentType')

var app = express()
//存储图片目录
var upload = multer({ dest: 'upload/' })

//单图上传
app.post('/upload-single', upload.single('file'), function(req, res, next){
  console.log(req) // 返回附件信息
  var fileType = req.file.originalname.substr(req.file.originalname.lastIndexOf('.'))
  fs.renameSync('./upload/'+req.file.filename, './upload/'+req.file.filename+fileType)  //给附件添加后缀
  res.send({status: true, file: '/upload/'+req.file.filename+fileType}) //返回附件路径 可直接访问
})

//访问html文件
app.get('/form', function(req, res, next){
  var form = fs.readFileSync('./upload.html', {encoding: 'utf-8'})
  res.send(form)
})

//访问附件
app.get('/upload/:name', function(req, res, next){
  var fileImg = fs.readFileSync(__dirname+req.url, 'binary')
  var fileType = req.url.substr(req.url.lastIndexOf('.'))
  console.log(fileType)
  res.writeHead(200, {'Content-Type': contentType[fileType]})
  res.write(fileImg, 'binary')
  res.end()
})

app.listen(3000)