// set up dependencies
const express = require("express");
const fs = require(fs);
const path = require('path');

// call express

const app = express();
const PORT = process.env.PORT || 3001;

// parse data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

// route file
require('./routes/routes')(app);

// call listener

app.listen(PORT, function() {
    console.log("app is listening on PORT:" + PORT);
});