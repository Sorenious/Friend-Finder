// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Star Wars Characters (DATA)
// =============================================================
var friends = [
];

var waitList = [
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "hot.restaurant.html"));
});

app.get("/form", function(req, res) {
  res.sendFile(path.join(__dirname, "form.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Show the list of table reservations
app.get("/api/tables", function(req, res) {  
  return res.json(reservations);
});

// Show the wait list
app.get("/api/waitlist", function(req, res) {  
  return res.json(waitList);
});

app.post("/api/clear", function(req, res) {
  reservations = [];
  waitList = [];
});

// Create new reservations - takes in JSON input
app.post("/api/tables", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newReservation = req.body;

  console.log(newReservation);
  if (reservations.length < 5) {
    reservations.push(newReservation);
    res.json(true);
  } else {
    waitList.push(newReservation);
    res.json(false);
  }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
