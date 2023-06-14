const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
const port = 3001
const routes = require('./src/routes/indexRouter')
const path = require("path");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use('/public/uploads', express.static('public/uploads'));


app.use('/',routes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
