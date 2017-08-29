$(document).ready(function () {

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDtxOO3JZngtjTz40sEwaOC0nX9wO9V7is",
    authDomain: "trainschedule-80bfd.firebaseapp.com",
    databaseURL: "https://trainschedule-80bfd.firebaseio.com",
    projectId: "trainschedule-80bfd",
    storageBucket: "",
    messagingSenderId: "882364456921"
  };

  firebase.initializeApp(config);

    var database = firebase.database();

    $("#submit").on("click", function(event) {
      event.preventDefault();

      var trainName = $("#trainName").val().trim();
      var trainDestination = $("#trainDestination").val().trim(); 
      var trainFirstTrain = $("#trainFirstTrain").val().trim();
      var trainFrequency = $("#trainFrequency").val().trim();
      
      $("#trainName").val("")
      $("#trainDestination").val("")
      $("#trainFirstTrain").val("")
      $("#trainFrequency").val("")
      
      var trainObject = {
        name: trainName,
        destination: trainDestination,
        firstTrain: trainFirstTrain,
        frequency: trainFrequency
        // dateAdded: firebase.database.ServerValue.TIMESTAMP
        // some arbitrary ID to delete ?
      };

      database.ref().push({ 
       trainObject
      });
    });

    database.ref().on("child_added", function(snapshot, prevChildKey) {

      // console.log("check for: " + snapshot.val());
      // console.log(snapshot.val());
      var trainObject = snapshot.val().trainObject;
      // console.log(trainObject);


      var trainName = trainObject.name;
      var trainDestination = trainObject.destination;
      var trainFirstTrain = trainObject.firstTrain;
      var trainFrequency = trainObject.frequency;

      var now = new Date();
      var nowHourMinute = moment(now).format("HH:mm");      

      var trainNextArrival = checkForNextTrainTime(trainFirstTrain, trainFrequency);
      var trainMinutesAway = moment(moment(trainNextArrival, "HH:mm").diff(moment(), "minutes"));

       $(".table > tbody").append(
          "<tr><td>"  + trainName + 
          "</td><td>" + trainDestination + 
          "</td><td>" + trainFirstTrain + 
          "</td><td>" + trainFrequency + 
          "</td><td>" + trainNextArrival + 
          "</td><td>" + trainMinutesAway
        + "</td></tr>");
    });

  function checkForNextTrainTime(trainFirstTrain, trainFrequency) {
    var now = new Date();
    var nowUnix = moment(now).format("x");
    var nowHourMinuteFormatted = moment(now).format("HH:mm");
    var returnTrainTime = moment(trainFirstTrain, "HH:mm");

    // if we're not past first train of the day, we use first train of the day
    if (nowUnix < returnTrainTime) {
      // console.log("First train hasn't gone yet - it is at: " + returnTrainTime)
      returnTrainTime = moment(returnTrainTime).format("HH:mm");
    }
    else {
      // add the frequency to the first train time (stored as return train time) until it's greater then the current time - this is our next train
      do { 
      returnTrainTime = moment(returnTrainTime, "HH:mm").add(trainFrequency, 'minutes').format("HH:mm")
      } while (nowHourMinuteFormatted > returnTrainTime);
    }

    return returnTrainTime
  }

});