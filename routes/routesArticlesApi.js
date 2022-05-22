const express = require('express');
const { route } = require('express/lib/application');
let router = express.Router()
const mongoose = require('mongoose')


// ===========================================================
// TABLE => articles
const Schema = mongoose.Schema;
const articlesSchema = new Schema({
    title: String,
    content: String,
    type: String,
    build_t: String,
    update_t: String,
});
const Articles = mongoose.model("articles", articlesSchema);

//Read
router
    .route('/read') 
        .get((req, res) => {
            Articles.find({}, "title content type build_t update_t").then(articles => {
                if (articles !== null && articles.length > 0) {
                    res.write(JSON.stringify(articles))
                } else {
                    res.write("No articles found")
                }
                res.end()
            })
    
        })
//Create
router
    .route('/create') 
        .post((req, res) =>{
            const data = req.body.params
            Articles.create({
                title:data.title,
                content:data.content,
                type:data.type,
                build_t:data.build_t,
                update_t:""
            })
            .then(resData=>{
                console.log("Create it's worked!")
                console.log(resData)
                res.status(200).send(`created article!: ${resData}`)
                res.end();
            })
            .catch(err=>{
                console.log(err)
            })
        })
//Update
router
    .route('/update') 
        .post((req, res) =>{
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
//Delete
router
    .route('/delete') 
        .post((req, res) =>{
            const data = req.body.params
            Articles.deleteOne({"_id":data._id})
            .then(resData=>{
                console.log("Delete it's worked!")
                res.status(200).send(`created article!: ${req._id}`)
                res.end()
            })
            .catch(err=>{
                console.log(err)
            })
        })
    
module.exports = router