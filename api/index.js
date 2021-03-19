const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

let port = 3000;
app.use(bodyParser.urlencoded({parameterLimit: 100000,limit:'50mb',extended:true}));
app.use(bodyParser.json());
app.use(cors());

require('./router')(app);


app.get('/', (req, res) => {
    res.json({"Name": "Check Get methods"})
})

app.post('/',(req,res)=>{
    res.json({"Name":"check post methods"})
})
app.listen(port,()=>{
    console.log("running port",+port);
})