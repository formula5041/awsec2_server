const express = require('express');
const { route } = require('express/lib/application');
let router = express.Router()
const mongoose = require('mongoose')


// ===========================================================
// TABLE => Cycling
const Schema = mongoose.Schema;
const cyclingSchema = new Schema({
    name: String,
    kind: String,
    area: String,
    km: String,
    kml: String,
    status: Boolean,
    build_t: String,
    update_t: String,
});
const Cyclings = mongoose.model("cyclings", cyclingSchema);

//Read
router
    .route('/readCycling') 
        .get((req, res) => {
            Cyclings.find({}, "name kind area km kml status build_t update_t").then(cycling => {
                if (cycling !== null && cycling.length > 0) {
                    res.write(JSON.stringify(cycling))
                } else {
                    res.write("No Cycling found")
                }
                res.end()
            })
    
        })
//Create
router
    .route('/createCycling') 
        .post((req, res) =>{
            const data = req.body.params
            Cyclings.create({
                name:data.name,
                kind:data.kind,
                area:data.area,
                km:data.km,
                kml:data.kml,
                status:data.status,
                build_t:data.build_t,
                update_t:data.update_t,
            })
            .then(resData=>{
                console.log("Create it's worked!")
                console.log(resData)
                res.status(200).send(`created cycling!: ${resData}`)
                res.end();
            })
            .catch(err=>{
                console.log(err)
            })
        })
//Update
// router
//     .route('/update') 
//         .post((req, res) =>{
//             const data = req.body.params
//             console.log(data);
//             Cycling.findOneAndUpdate(
//                 {"_id":data._id},
//                 {"$set":
//                     {
//                         "title": data.title,
//                         "content": data.content,
//                         "type": data.type,
//                         "build_t": data.build_t,
//                         "update_t": data.update_t,
//                     }
//                 }
//             )
//             .then(resData=>{
//                 console.log("Update it's worked!")
//                 res.status(200).send(`created article!: ${resData._id}`)
//                 res.end()
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         })
//Delete
// router
//     .route('/delete') 
//         .post((req, res) =>{
//             const data = req.body.params
//             Cycling.deleteOne({"_id":data._id})
//             .then(resData=>{
//                 console.log("Delete it's worked!")
//                 res.status(200).send(`created article!: ${req._id}`)
//                 res.end()
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         })
    
module.exports = router