//manoel.deligny@gmail.com

//Application qui fonctionne format web (pas forcément joli...)
//Déployer complètement sur le web (aws,heroku...) HEROKU
//Git
//Création d'un compte utilisateur, connexion, déconnexion
//Création, modification, supression d'une tache
//Angular appelle serveur nodejs

//mlab

//Appels vers les structures de données partie business ne doit pas avoir de code par rapport à ça
// Sait où et comment sont stockées les données


var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://mirana:ihary@cluster0-qp2kf.mongodb.net/Poly?retryWrites=true";
var client = new MongoClient(uri, {useNewUrlParser:true });
var db;

var datalayer = {
    init : function(cb){
        //Initialize connection once
        client.connect(function(err) {
            if(err) throw err;
            db = client.db("Poly");
            cb();
        });
    },

    /* ================ TASKS ================ */

    getTaskSet : function(user, cb){
        db.collection("Tasks").find({creator : user}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getTaskGrouped : function(user, groupe, cb){
        db.collection("Tasks").find({creator : user, group: groupe}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    getTask : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("getTask");
        db.collection("Tasks").findOne(ident, function(err,result) {
            cb(result);
        });
    },
    
    insertTask : function(task, cb){
        db.collection("Tasks").insertOne(task, function(err) {
            cb();
        });
    },

    updateTask : function(id, task, cb) {
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("updateTask");
        db.collection("Tasks").updateOne(ident, {$set: task}, function(err, result) {
            cb();
        });
    },

    deleteTask : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("deleteTask");
        db.collection("Tasks").deleteOne(ident, function(err) {
            cb();
        });
    },

    /* ================ GROUPS ================ */

    getGroup : function(id, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("getGroup");
        db.collection("Groups").findOne(ident, function(err,result) {
            cb(result);
        });
    },

    getAllGroup : function(user, cb){
        db.collection("Groups").find({creator : user}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    insertGroup : function(group, cb){
        db.collection("Groups").insertOne(group, function(err) {
            cb();
        });
    },

    deleteGroup : function(id, user, groupe, cb){
        ObjectID = require('mongodb').ObjectID;
        var ident = {
            _id : new ObjectID(id)
        };
        console.log("deleteGroup");
        db.collection("Groups").deleteOne(ident, function(err) {});
        db.collection("Tasks").deleteMany({creator : user, group: groupe},function(err) {
            cb();
        });
    },

    /* ================ USERS ================ */

    getUserSet : function(cb){
        db.collection("Users").find({}).toArray(function(err, docs) {
            cb(docs);
        });
    },

    createUser : function(user, cb){
        db.collection("Users").findOne({ pseudo: user.pseudo },function(err, docs) {
           if(docs==null){
                console.log("Inscription");
                db.collection("Users").insertOne(user, function(err) {
                    cb();
                });
           }
           else {
               console.log("Pseudo déjà utilisé");
               cb();
           }
        });
    },

    getUser : function(user, cb){
        db.collection("Users").findOne(user, function(err,result) {
            cb(result);
        });
    }
};

//module.exports(datalayer) --> datalayer
//module.exports=datalayer;
module.exports=datalayer;