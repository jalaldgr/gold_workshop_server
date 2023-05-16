const express = require('express')
const bodyParser = require('body-parser');
require('dotenv').config();
const app = express()
const port = 3000
const routes = require('./src/routes/indexRouter')
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use('/',routes)


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
