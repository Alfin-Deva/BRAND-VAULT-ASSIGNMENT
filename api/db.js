const mongodb = require('mongodb');
var database;

mongodb.connect('mongodb://localhost:27017/BrandValut-ASSIGNMENT',{  useNewUrlParser:true,
useUnifiedTopology: true},(error,connection)=>{
if(connection){
    database = connection.db('BrandValut-ASSIGNMENT')
    console.log("DB Connected Successfully..!",database.databaseName)
}
})
exports.insert = async(req,res)=>{
    const collection = database.collection('UsersCollections');
    var data=req.body;
    collection.findOneAndUpdate({"emailID":data.emailID},{$set:data},{ upsert: true }).then((result)=>{
        console.log("result======",result);
     res.send(result);
})
}


exports.find = (req,res)=>{
    const collection = database.collection('UsersCollections');
    collection.find({}).toArray((error,result)=>{
        if(error){
            console.log(error)
        }
        if(result){
            res.send(result);
        }
    })
}

exports.check=(req,res)=>{
    const collection = database.collection('UsersCollections');
    var data=req.body;
    collection.find({"emailID":data.emailID}).toArray((error,result)=>{
        if(error){
            console.log(error)
        }
        if(result){
            console.log("result========",result);
            if(result.length>0){
                res.send({isUnique:true});
            }
            else{
                res.send({isUnique:false});
            }
        }
    })
}
