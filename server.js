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
var friends = require("./app/data/friends.js")

var waitList = [
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/index.html"));
});

app.get("/survey", function(req, res) {
  res.sendFile(path.join(__dirname, "app/public/survey.html"));
});

// app.get("/tables", function(req, res) {
//   res.sendFile(path.join(__dirname, "tables.html"));
// });

// Show the list of friends
app.get("/api/friends", function(req, res) {  
  return res.json(friends);
});

// Show the wait list
// app.get("/api/waitlist", function(req, res) {  
//   return res.json(waitList);
// });

// app.post("/api/clear", function(req, res) {
//   friends = [];
//   waitList = [];
// });

// Create new friends - takes in JSON input
app.post("/api/friends", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  var newFriend = req.body;
  var diffTotals = [];

  for (var i = 0; i < friends.length; i++) {
    var diffScores = [];
    for (var j = 0; j < friends[i].scores.length; j++) {
      var diffScore = parseInt(friends[i].scores[j]) - parseInt(newFriend["scores[]"][j]);
      if (diffScore < 0) {
        diffScore *= -1;
      }
      diffScores.push(diffScore);
    }
    var totalDiff = 0;
    for (var k = 0; k < diffScores.length; k++) {
      totalDiff += diffScores[k];
    }
    diffTotals.push(totalDiff);
  }

  var closestScore = diffTotals[0];
  var index = 0;
  for (var l = 1; l<diffTotals.length; l++) {
    if (diffTotals[l] < closestScore) {
      index = l;
    }
  }
  friends.push(newFriend);
  res.json(friends[index]);
  // console.log(newFriend);
  // if (friends.length < 5) {
  //   friends.push(newFriend);
  //   res.json(true);
  // } else {
  //   waitList.push(newFriend);
  //   res.json(false);
  // }
});

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
