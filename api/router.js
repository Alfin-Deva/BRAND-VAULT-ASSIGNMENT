module.exports = (app) =>{
    const handler = require('./handler');
    app.post ('/users',handler.insertUsers);
   app.post('/getUserList',handler.getUserList);
   app.post('/checkUnique',handler.checkUnique);
 }