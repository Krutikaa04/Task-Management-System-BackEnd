const express = require("express");
const bodyParser = require("body-parser");

require("dotenv").config();

require("./connection/connection");

const router = require('./router/routes')

const app = express();
const port = process.env.PORT;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/",router);


app.listen(port, () => {
  console.log(`App running on port ${port}`);
});


//password = 123456