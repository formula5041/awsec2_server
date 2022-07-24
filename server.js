const express = require('express')
const app = express()
const multer = require('multer')
const mongoose = require('mongoose')
const fs = require('fs')

const routesMemberApi = require('./routes/routesMemberApi')
const routesArticlesApi = require('./routes/routesArticlesApi')
const routesCyclingApi = require('./routes/routesCyclingApi')

// 專案路徑設定
app.use('/public', express.static(__dirname + '/public'))
app.use('/build', express.static(__dirname + '/build'))
app.use('/travel_write', express.static(__dirname + '/travel_write'))

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888')

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Content-Type', 'application/json')

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true)

    // Pass to next layer of middleware
    next()
})

// uploadFiles setting
const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './Images')
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '--' + file.originalname)
  }
})

const upload = multer({storage: fileStorageEngine})

app.post('/single', upload.single('image') ,(req, res) =>{
  console.log(req.file)
  res.send('Single File upload success')
})

app.post('/multiple', upload.array('images', 3) ,(req, res) =>{
  console.log(req.files)
  res.send('Multiple Files upload success')
})

// get images setting
// http://18.181.82.168/getImages?name=1658631895739--omgCat.jpeg
app.get('/getImages',(req, res) =>{
  let fileName = req.query.name
  let filePath = `Images/${fileName}`
  res.writeHead(200,{'Content-Type':'image/png'})
  fs.readFile(filePath, function(err, data){
    if(err){
      res.end('讀取錯誤')
    } else {
      res.end(data)
    }
  })
})

// MONGODB SETTING
// May only be exist once in app
mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true })
.then(res=>{
    console.log("Open connection to mongoDB!!!")
})
.catch(err=>{
    console.log("ERROR CONNECTION")
    console.log(err)
})

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb', extended: false}))

app.use("/travel_write/members", routesMemberApi)
app.use("/travel_write/articles", routesArticlesApi)
app.use("/travel_write/cyclings", routesCyclingApi)

app.listen(8000)