// set up dependencies
const { errorMonitor } = require("events");
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
    res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));  
});

// set up api endpoints
app.post("/api/notes", function(req, res) {
    fs.readFile(__dirname + "./db/db.json", 'utf8', function(error, notes) {
        if (error) {
            return console.log(error);
        }
        notes = JSON.parse(notes);

        const id = notes[notes.length - 1].id + 1;
        const newNote = { title: req.body.title, text: req.body.text, id: id};
        const currentNote = notes.concat(newNote);

        fs.writeFile(__dirname + "./db/db.json", JSON.stringify(currentNote), function(error, data) {
            if (error) {
                return error
            }
            console.log(currentNote)
            res.json(currentNote);
        });
    });
});

// pull input from db.json

app.get("/api/notes", function(req, res) {
    fs.readFile(__dirname + "./db/db.json", 'utf8', function(error, data) {
        if(error) {
            return console.log(error);
        }
        console.log ("Welcome to Notetaker.", data);
        res.json(JSON.parse(data));
    });
});

// Bonus delete notes

app.delete("./api/notes/:id", function(req, res) {
    const noteId = JSON.parse(req.params.id);
    console.log(noteId);
    fs.readFile(__dirname + "./db/db.json", 'utf8', function(error, notes) {
        if (error) {
            return console.log(error);
        }
        notes = JSON.parse(notes);
        notes = notes.filter(val => val.id !== noteId)

        fs.writeFile(__dirname + "./db/db.json", 'utf8', function(error, notes) {
            if (error) {
                return console.log(error);
            }
            res.json(notes);
        });
    });
});

app.put("/api/notes/:id", function(req, res) {
    const noteId = JSON.parse(req.params.id)
    console.log(noteId);
    fs.readFile(__dirname + "./db/db.json", 'utf8', function(error, notes) {
        if (error) {
            return console.log(error);
        }
        notes.JSON.parse(notes);

        notes = notes.filter(val => val.id !== noteId);

        fs.writeFile(__dirname + "./db/db.json", JSON.stringify(notes), function(error, data) {
            if (error) {
                return error;
            }
            res.json(notes);
        });
    });
});

// call listener

app.listen(PORT, function() {
    console.log("app is listening on PORT:" + PORT);
});