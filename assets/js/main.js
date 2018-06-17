// Initialize Firebase
var config = {
    apiKey: "AIzaSyBww4qLWH9y7u2_FdB4_dzEfQjCoSLyZmA",
    authDomain: "trainschedulehw-333fb.firebaseapp.com",
    databaseURL: "https://trainschedulehw-333fb.firebaseio.com",
    projectId: "trainschedulehw-333fb",
    storageBucket: "",
    messagingSenderId: "408985029619"
  };
  $(document).ready();
  firebase.initializeApp(config);
  database = firebase.database();
// <!-- get train info into database -->
   $("#add-train").on("click", function(event) {
  // Don't refresh the page!
  event.preventDefault();
  trainName = $("#train-name").val().trim();
  destination = $("#destination").val().trim();
  trainTime = $("#first-train-time").val().trim();
  trainFrequency = $("#frequency").val().trim();
  
  

// <!-- Clear Form -->
$("#destination").val("");
$('#train-name').val("");
$('#first-train-time').val("");
$('#frequency').val("");



    var newTrainInfo = {
  trainName: trainName,
  destination: destination,
  trainTime: trainTime,
  trainFrequency: trainFrequency
  }
//   console.log(newTrainInfo);
  

  database.ref().push(newTrainInfo);
    })



database.ref().on("child_added", function(snapshot) {

// show value to ensure database is working
// function populateTable(Snapshot) {
var trainData = snapshot.val();
console.log(trainData);

var trainName = snapshot.val().trainName;
var destination = snapshot.val().destination;
var trainFrequency = snapshot.val().trainFrequency;
var firstTime = snapshot.val().trainTime;
var tFrequency = trainFrequency;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
// console.log("ARRIVAL TIME: " + moment(nextTrain));

    $("#train-list-items").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" +
  trainFrequency + "</td><td>" + nextTrain + "</td><td>" + tMinutesTillTrain + "</td><td>");
})