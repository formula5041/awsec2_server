const express = require('express');
const { route } = require('express/lib/application');
const { decode } = require('js-base64')
let router = express.Router()
const mongoose = require('mongoose')

// ===========================================================
// TABLE => members
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    userName: String,
    password: String
});
const Member = mongoose.model("member", memberSchema)

//Read
router
 .route('/')
    .get((req, res) => {
        Member.find({}, "userName password").then(members => {
            if (members !== null && members.length > 0) {
                res.write(JSON.stringify(members))
            } else {
                res.write("No members found")
            }
            res.end()
        });
    })
//get compare to login
router
    .route('/login') 
        .post((req, res) =>{
            let clintData = req.body.params
            let theMemberData
            Member.find({}, "userName password").then(members => {
                if (members !== null && members.length > 0) {
                    theMemberData = members[0]
                    if(theMemberData.userName === clintData.userName) {
                        if(theMemberData.password === decode(clintData.password)) {
                            res.send("SUCCESS!")
                        } else {
                            res.status(400);
                            res.send("PASSWORD IS WRONG!")
                        }
                    } else {
                        res.status(400);
                        res.send("USER NAME IS NOT FOUND!")
                    }
                } else {
                    res.status(204);
                    res.send("DB MEMBER IS EMPTY!")
                }
                res.end()
            })
        })
module.exports = router