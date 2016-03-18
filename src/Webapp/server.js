/**
 * Created by Hans Van Stupid on 17/03/2016.
 */

var express = require("express");
var bodyparser = require("body-parser");
var request = require("request");
var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
    extended: true
}));

var mongoose = require('mongoose');
var User = require('./models/users');
var Team = require('./models/teams');
var Member = require('./models/members');
mongoose.connect("mongodb://"+process.env.db_info+"@ds013589.mlab.com:13589/hackaton");


app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header ('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
    next();
});

process.chdir("../");
var path = require('path');

app.use(bodyparser.json());


app.get("/",function(req,res){
    res.sendFile(__dirname + "/" + "index.html");
});
app.get("/css/reset.css",function(req,res) {
    res.sendFile(__dirname + "/css/" + "reset.css");
});
app.get("/js/controller.js",function(req,res) {
    res.sendFile(__dirname + "/js/" + "controller.js");
});

app.get("/api/teams",function(req,res){
   Team.find({},function(err,allteams){
       if (err) throw err;

       // object of all the users
       console.log("requested all users");
       res.json(allteams);
   })
});

app.post("/api/addteam",function(req,res){
    var tm = new Team({
        TeamName:req.body.TeamName,
        Members:[]
    });

    tm.save(function (err) {
        if (err) {
            console.log("post response: " + err.message);
            res.send(err.message + err);
        }
        else{
            res.send("Team added");
        }
    });

});

app.post("/api/addmember",function(req,res){

});

app.get("/api/users",function(req,res){

    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log("requested all users");
        res.json(users);
    });
});

app.post("/api/newuser",function(req,res){

    console.log( req.body);


    var newUser = new User({
        Email: req.body.Email,
        Password: req.body.Password,
        FirstName: req.body.FirstName,
        LastName: req.body.LastName
    });

    User.find({email: req.body.email}, function(err, users) {
        if (err) {
            console.log("post response: " + err.message);

        }else{
            if (users[0] == undefined) {

                newUser.save(function (err) {
                    if (err) {
                        console.log("post response: " + err.message);
                        res.send(err.message + err);
                    }
                    else{
                        res.send("true");
                        console.log("post response: Created new user: " + newUser.Email);}


                });
            }else{
                console.log("post response: " + "User " + newUser.Email +" already exists");
                res.send("User " + newUser.Email +" already exists");
            }
        }
    });
});

app.post('/api/login',function(req,res){
    console.log("Post Request: login " + req.body.Email);

    User.find({email: req.body.Email}, function(err, users) {
        if (err){
            console.log("Post Response: " + err);
            res.send(err.message);
        }

        if(users[0] != undefined ){

            if(users[0].password == req.body.password){
                console.log("Post Response: " + users[0].first_name + " " + users[0].last_name+" signed in");
                res.send(users[0].first_name + " " + users[0].last_name+" signed in" );
            }else {
                console.log("Post Response: " + users[0].email + " wrong password");
                res.send("Password is incorrect! please try again" );
            }

        }else{
            res.send("user: " + req.body.email + " wasn't found in the database");
            console.log("Post response:" + "user: " + req.body.email + " wasn't found in the database");
        }

    });


});

app.listen(3000);