const express = require('express');
const path = require('path');
const app = express();
const mongoose = require('mongoose');

// Add headers before the routes are defined
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8888');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// __dirname === /home/ec2-user
// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/travel_write'));

// MONGODB SETTING
// May only be exist once in app
mongoose.connect("mongodb://my_user:my_pwd@localhost:27017/mern", { useNewUrlParser: true });


// table => members
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    firstName: String,
    lastName: String
});
const Member = mongoose.model("member", memberSchema);

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

// table => articles
const articlesSchema = new Schema({
    title: String,
    content: String,
    build_t: String,
    update_t: String,
});
const Articles = mongoose.model("articles", articlesSchema);

app.get('/articles', (req, res) => {
    Articles.find({}, "title content build_t update_t").then(articles => {
        if (articles !== null && articles.length > 0) {
            res.write(JSON.stringify(articles));
        } else {
            res.write("No articles found");
        }
        res.end();
    });
}).listen(8000);