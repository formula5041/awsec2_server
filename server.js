const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');


// __dirname === /home/ec2-user
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
app.use(express.static(__dirname + '/travel_write'));

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Content-Type', 'application/json');

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
    console.log("ERROR CONNECTION");
    console.log(err)
})

// TABLE => members
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    firstName: String,
    lastName: String
});
const Member = mongoose.model("member", memberSchema);

//Read
app.get('/members', (req, res) => {
    Member.find({}, "firstName lastName").then(members => {
        if (members !== null && members.length > 0) {
            res.write(JSON.stringify(members));
        } else {
            res.write("No members found");
        }
        res.end();
    });
})

// TABLE => articles
const articlesSchema = new Schema({
    title: String,
    content: String,
    type: String,
    build_t: String,
    update_t: String,
});
const Articles = mongoose.model("articles", articlesSchema);

//Read
app.get('/articles/read', (req, res) => {
    Articles.find({}, "title content type build_t update_t").then(articles => {
        if (articles !== null && articles.length > 0) {
            res.write(JSON.stringify(articles));
        } else {
            res.write("No articles found");
        }
        res.end();
    });
})

//Create
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.post('/articles/create', (req, res) =>{
    const data = req.body.params
    Articles.create({
        title:data.title,
        content:data.content,
        type:data.type,
        build_t:data.build_t,
        update_t:""
    })
    .then(resData=>{
        console.log("Create it's worked!");
        console.log(resData);
        res.status(200).send(`created article!: ${resData}`)
        res.end();
    })
    .catch(err=>{
        console.log(err);
    })
})

//update
app.post('/articles/update', (req, res) =>{
    const data = req.body.params
    console.log(data);
    Articles.findOneAndUpdate(
        {"_id":data._id},
        {"$set":
            {
                "title": data.title,
                "content": data.content,
                "type": data.type,
                "build_t": data.build_t,
                "update_t": data.update_t,
            }
        }
    )
    .then(resData=>{
        console.log("Update it's worked!")
        res.status(200).send(`created article!: ${resData._id}`)
        res.end()
    })
    .catch(err=>{
        console.log(err)
    })
})

//delete
app.post('/articles/delete', (req, res) =>{
    const data = req.body.params
    Articles.deleteOne({"_id":data._id})
    .then(resData=>{
        console.log("Delete it's worked!")
        res.status(200).send(`created article!: ${resData._id}`)
        res.end()
    })
    .catch(err=>{
        console.log(err)
    })
}).listen(8000);
