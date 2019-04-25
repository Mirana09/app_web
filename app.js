//datalayer
var datalayer = require('./datalayer.js');


const express = require('express');
const app = express();
const port = 3000;
var bodyParser = require('body-parser');

app.use(bodyParser.json());                             // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({extended: true}));       // to support URL-encoded bodies

app.use(express.static(__dirname + '/public'));

datalayer.init(function(){
    console.log('init');
    app.listen(process.env.PORT || 3000);
    console.log("Listening on port 3000");
});

app.get('/', function(req,res){
	res.sendFile('./public/user_index.html', {root: __dirname});
});

app.get('/tasks', function(req,res){
	res.sendFile('./public/task_index.html', {root: __dirname});
});

app.get('/groups', function(req,res){
	res.sendFile('./public/group_index.html', {root: __dirname});
});

app.get('/erreur_login', function(req,res){
	res.sendFile('./public/erreur_login.html', {root: __dirname});
});

/* ================ TASKS ================ */

//Send all tasks
app.get("/getTaskSet/:creator", function(req,res){
    var creator = req.params.creator;
    datalayer.getTaskSet(creator,function(dtSet){
        res.send(dtSet);
    });
});

//Send tasked grouped by group
app.get("/getTaskGrouped/:creator/:group", function(req,res){
    var creator = req.params.creator;
    var group = req.params.group;
    console.log(group);
    datalayer.getTaskGrouped(creator, group, function(dtSet){
        res.send(dtSet);
    });
});

//insert task
app.post("/addTask/:creator/:group", function(req,res) {
    var user = req.params.creator;
    var groupe = req.params.group;
    var task = {
        name : req.body.name,
        done : "false",
        creator : user,
        group : groupe
    };
    datalayer.insertTask (task, function() {
        datalayer.getTaskGrouped(user, groupe, function(dtSet){
            res.send(dtSet);
        });
    });
});

//Checkbox --> même fonction mais avec uniquement done
app.put("/updateTaskDone/:creator/:group/:liste_id", function(req,res) {
    var id = req.params.liste_id;
    var user = req.params.creator;
    var groupe = req.params.group;
    datalayer.getTask(id, function(result) {
        if (result.done == "false"){
            var task = {
                done : "true"
            };
        }
        else {
            var task = {
                done : "false"
            };
        }
        datalayer.updateTask (id, task, function() {
            datalayer.getTaskGrouped(user,groupe,function(dtSet){
                res.send(dtSet);
            });
        });
    });
});

// Modification --> même fonction mais uniquement name
app.put("/updateTaskName/:creator/:group/:liste_id", function(req,res) {
    var id = req.params.liste_id;
    var user = req.params.creator;
    var groupe = req.params.group;
    var task = {
        name : req.body.name
    };
    datalayer.updateTask (id, task, function() {
        datalayer.getTaskGrouped(user,groupe,function(dtSet){
            res.send(dtSet);
        });
    });
});

//delete task
app.delete("/deleteTask/:creator/:group/:liste_id", function(req,res) {
    var id = req.params.liste_id;
    var user = req.params.creator;
    var groupe = req.params.group;
    datalayer.deleteTask (id, function() {
        datalayer.getTaskGrouped(user, groupe,function(dtSet){
            res.send(dtSet);
        });
    });
});


/* ================ GROUPS ================ */

app.get("/getGroup/:group_id", function(req,res){
    var id = req.params.group_id;
    datalayer.getGroup(id, function(dtSet){
        res.send(dtSet);
    });
});

//Send all groups
app.get("/getAllGroup/:creator", function(req,res){
    var creator = req.params.creator;
    datalayer.getAllGroup(creator, function(dtSet){
        res.send(dtSet);
    });
});

//insert group
app.post("/addGroup/:creator", function(req,res) {
    var user = req.params.creator;
    var group = {
        name : req.body.name,
        creator : user
    };
    datalayer.insertGroup (group, function() {
        datalayer.getAllGroup(user, function(dtSet){
            res.send(dtSet);
        });
    });
});

//delete group
app.delete("/deleteGroup/:creator/:group/:liste_id", function(req,res) {
    var id = req.params.liste_id;
    var user = req.params.creator;
    var groupe = req.params.group;
    datalayer.deleteGroup(id, user, groupe, function() {
        datalayer.getAllGroup(user,function(dtSet){
            res.send(dtSet);
        });
    });
});

/* ================ USERS ================ */

//Send all users
app.get("/getUserSet", function(req,res){
    datalayer.getUserSet(function(dtSet){
        res.send(dtSet);
    });
});

//Create User
app.post("/createUser", function(req,res) {
    var user = {
        pseudo : req.body.pseudo,
        mdp : req.body.mdp
    };
    datalayer.createUser (user, function() {
        datalayer.getUserSet(function(dtSet){
            res.send(dtSet);
        });
    });
});

//Login
app.post("/login", function(req,res) {
    var user = {
        pseudo : req.body.pseudo,
        mdp : req.body.mdp
    };
    datalayer.getUser(user, function(result) {
        if (result == null){
            console.log("Echec connexion");
        }
        else {
            console.log("Connexion OK");
        }
        res.send(result);
    });
});