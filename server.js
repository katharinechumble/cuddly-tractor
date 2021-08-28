// set up dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// call express

const app = express();
const PORT = process.env.PORT || 3001;

// parse data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// set up the routes
// Basic routes
app.get("/", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));  
});

// call listener

app.listen(PORT, function() {
    console.log("app is listening on PORT:" + PORT);
});