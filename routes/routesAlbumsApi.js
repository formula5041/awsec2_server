const express = require('express');
const { route } = require('express/lib/application');
let router = express.Router()
const mongoose = require('mongoose')


// ===========================================================
// TABLE => albums
const Schema = mongoose.Schema;
const albumsSchema = new Schema({
    title: String,
    city: String,
    area: String,
    descript: String,
    coverImg: String,
    imgLists: Array,
    build_t: String,
    update_t: String,
    shooting_t: String,
});
const albums = mongoose.model("albums", albumsSchema);

//Read
router
    .route('/read') 
        .get((req, res) => {
            albums.find({}, "title city area descript coverImg imgLists build_t update_t shooting_t").then(albums => {
                if (albums !== null && albums.length > 0) {
                    res.write(JSON.stringify(albums))
                } else {
                    res.write("No albums found")
                }
                res.end()
            })
    
        })
//Create
router
    .route('/create') 
        .post((req, res) =>{
            const data = req.body.params
            albums.create({
                title:data.title,
                city:data.city,
                area:data.area,
                descript:data.descript,
                coverImg:data.coverImg,
                imgLists:data.imgLists,
                build_t:data.build_t,
                update_t:"",
                shooting_t:data.shooting_t,
            })
            .then(resData=>{
                console.log("Create it's worked!")
                console.log(resData)
                res.status(200).send(`created album!: ${resData}`)
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
            albums.findOneAndUpdate(
                {"_id":data._id},
                {"$set":
                    {
                      "title":data.title,
                      "city":data.city,
                      "area":data.area,
                      "descript":data.descript,
                      "coverImg":data.coverImg,
                      "imgLists":data.imgLists,
                      "build_t":data.build_t,
                      "update_t":"",
                      "shooting_t":data.shooting_t,
                    }
                }
            )
            .then(resData=>{
                console.log("Update it's worked!")
                res.status(200).send(`created album!: ${resData._id}`)
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
            albums.deleteOne({"_id":data._id})
            .then(resData=>{
                console.log("Delete it's worked!")
                res.status(200).send(`created album!: ${req._id}`)
                res.end()
            })
            .catch(err=>{
                console.log(err)
            })
        })
    
module.exports = router