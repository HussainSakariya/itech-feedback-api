require('dotenv').config();
var express = require('express');
var app = express();
var cors = require('cors');
const bodyParser = require("body-parser");
var path = require('path');
app.use(cors());

app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))

const router = express.Router();
global.appRoot = path.resolve(__dirname);

require('./router')(app);

var server = app.listen( process.env.PORT || 5001, function(){
    console.log('Listening on port ' + server.address().port);
});
