/**
 * Created by rival on 17/03/2016.
 */
var mongoose = require("mongoose");

var memberModel = new mongoose.Schema(
    {
        Email:{
            type: String,
            required:true
        },
        FirstName: {
            type: String,
            required:true
        },
        LastName: {
            type: String,
            required:false
        }
    });

var teamModel = new mongoose.Schema(
    {
        TeamName:{
            type: String,
            required:true
        },
        Members:{
            type: [memberModel],
            required:false
        }
    });



var Team = mongoose.model('Teams', teamModel);

module.exports = Team;