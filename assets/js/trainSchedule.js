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
      var trainDestination =$("#trainDestination").val().trim(); 
      var trainFirstTrain = $("#trainFirstTrain").val().trim();
      var trainFrequency = $("#trainFrequency").val().trim(); 
      
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

      console.log("check for: " + snapshot.val());
      console.log(snapshot.val());
      var trainObject = snapshot.val().trainObject;
        console.log(trainObject);


      var trainName = trainObject.name;
      var trainDestination = trainObject.destination;
      var trainFirstTrain = trainObject.firstTrain;
      var trainFrequency = trainObject.frequency;
      var trainNextArrival = 123;
      var trainMinutesAway = 456;

      var totalMonths = 1 //calculateMonthsOfPay(empStartLatest);

       $(".table > tbody").append(
        "<tr><td>" + trainName + 
          "</td><td>" + trainDestination + 
          "</td><td>" + trainFirstTrain + 
          "</td><td>" + trainFrequency + 
          "</td><td>" + trainNextArrival + 
          "</td><td>" + trainMinutesAway
        + "</td></tr>");
    })


// function calculateMonthsOfPay (startDate) {
// currentDate = new Date()
// // full months
// var months = monthDiff(startDate, currentDate);
// var startDateAsDate = new Date(startDate);

// // part of month
// var numberOfDays = startDateAsDate.getDate();
// var numberOfPaidDays = (30 - numberOfDays);
// var numberOfPaidPartialMonths = (numberOfPaidDays / 30);
// months += numberOfPaidPartialMonths;
// return months
// }


// function monthDiff(d1String, d2String) { // props to:  https://stackoverflow.com/questions/2536379/difference-in-months-between-two-dates-in-javascript
//     var months;
//     var d1 = new Date(d1String);
//     var d2 = new Date(d2String);
//     months = (d2.getFullYear() - d1.getFullYear()) * 12;
//     months -= d1.getMonth() + 1;
//     months += d2.getMonth();
//     return months <= 0 ? 0 : months;
// }
})