const express = require('express');
const { route } = require('express/lib/application');
let router = express.Router()
const mongoose = require('mongoose')

// ===========================================================
// TABLE => members
const Schema = mongoose.Schema;
const memberSchema = new Schema({
    firstName: String,
    lastName: String
});
const Member = mongoose.model("member", memberSchema)

//Read
router
 .route('/')
    .get((req, res) => {
        Member.find({}, "firstName lastName").then(members => {
            if (members !== null && members.length > 0) {
                res.write(JSON.stringify(members))
            } else {
                res.write("No members found")
            }
            res.end()
        });
    })
module.exports = router