// set up dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// call express

const app = express();
const PORT = process.env.PORT || 3000;

// parse data

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// set up the routes
// Basic routes
module.exports = app => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) throw err;

        var notes = JSON.parse(data);
    });
    app.get("/api/notes", function(req, res){
        res.json(notes);
    });
    
    // set up api endpoints
    app.post("/api/notes", function(req, res) {
        let newNote = req.body;
        notes.push(newNote);
        updateDb();
        return console.log("Success! Added new note!");
    });
    
    // pull input from db.json
    
    app.get("/api/notes/id:", function(req, res) {
        res.json(notes[req.params.id]);
    });
    
    // Bonus delete notes
    
    app.delete("/api/notes/:id", function(req, res) {
        notes.splice(req.params.id, 1);
        updateDb();
        console.log("Success, note deleted!");
    });

    //Display index.html
    app.get('*', function(req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    // Display notes
    app.get('/notes', function(req, res) {
         res.sendFile(path.join("./public/notes.html"));
       });

    // update json file
    function updateDb() {
        fs.writeFile("db/db.json", JSON.stringify(notes, '\t'), err => {
            if (err) throw err;
            return true;
        });
    };
};

// call listener

app.listen(PORT, function() {
    console.log("app is listening on PORT:" + PORT);
});