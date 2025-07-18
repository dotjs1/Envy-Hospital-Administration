require('dotenv').config();
const express=require('express');
const cors=require('cors');
const bodyParser = require("body-parser");
const app=express();
const PORT=process.env.PORT||3001;
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const loginauth=require('./middleware/auth');
const adddoc=require('./routes/user');
const apporoutes=require('./appointment');
const ConnectDB=require('./db');
ConnectDB();
app.use('/api/user',loginauth)
app.use('/api/user',adddoc);
app.use('/api/user',apporoutes);

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})