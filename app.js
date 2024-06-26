const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.listen(port, ()=>{
    console.log(`App running on port ${port}`);
});