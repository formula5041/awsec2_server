const express = require('express')
const app = express()
const mongoose = require('mongoose')

const routesMemberApi = require('./routes/routesMemberApi')
const routesArticlesApi = require('./routes/routesArticlesApi')
app.use(express.static(__dirname + '/travel_write/'))

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
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.use("/members", routesMemberApi)
app.use("/articles", routesArticlesApi)

app.listen(8000)
