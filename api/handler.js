const { data } = require('jquery');
const database = require('./db');
exports.insertUsers = (req,res)=>{
    console.log('req--->',req.body);
    database.insert(req,res);
}

exports.getUserList = (req,res)=>{
    console.log('req--->',req.body);
    database.find(req,res);
}

exports.checkUnique=(req,res)=>{
    console.log('req--->',req.body);
    database.check(req,res);
}