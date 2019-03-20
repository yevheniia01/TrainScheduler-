var config = {
    apiKey: "AIzaSyDd-D28PibvsppfPA2RVW5iPTD1FMMTXBk",
    authDomain: "trainscheduler-bc726.firebaseapp.com",
    databaseURL: "https://trainscheduler-bc726.firebaseio.com",
    projectId: "trainscheduler-bc726",
    storageBucket: "",
    messagingSenderId: "223093470668"
  };
  firebase.initializeApp(config);
//////////////////////////////////////////////
  var database = firebase.database();
  var currentTime = moment().format();

  

  $('#submitBtnText').on('click', function(event){
      event.preventDefault();
      if ($('#formGroupExampleInput').val() === "" ||
      $('#formGroupExampleInput2').val() === "" ||
      $('#formGroupExampleInput3').val() === "" ||
      $('#formGroupExampleInput4').val() === "") {
  
      alert("Please fill in all Input Fields");
      $('#formGroupExampleInput').val("");
      $('#formGroupExampleInput2').val("");
      $('#formGroupExampleInput3').val("");
      $('#formGroupExampleInput4').val("");
      }else{
  

      var trainName = $('#formGroupExampleInput').val();
      var destination = $('#formGroupExampleInput2').val();
      var firstTrainTime = moment($('#formGroupExampleInput3').val(), "HH:mm").format('HH:mm');
      var frecuency = $('#formGroupExampleInput4').val();

      database.ref().push({
          trainNamevar: trainName,
          destinationvar: destination,
          firstTrainTimevar: firstTrainTime,
          frecuencyvar: frecuency
      })
      $('#formGroupExampleInput').val("");
      $('#formGroupExampleInput2').val("");
      $('#formGroupExampleInput3').val("");
      $('#formGroupExampleInput4').val("");
    }
  })

  database.ref().on('child_added', function(snapshot){

    var newvarTrainName = snapshot.val().trainNamevar
    var newvarDestination = snapshot.val().destinationvar
    var newvarFirstTrainTime = snapshot.val().firstTrainTimevar
    var newvarfrecuency = snapshot.val().frecuencyvar

    var trainTimeConverted = moment(newvarFirstTrainTime, "HH:mm")
    var timeDiffer = moment().diff(moment(trainTimeConverted, 'minutes'))
    console.log(timeDiffer);
    var frequencyMinutes = snapshot.val().frecuencyvar;

    var minsAway = Math.abs(timeDiffer%frequencyMinutes);
    console.log("minutes away" + minsAway)
    var nextArrival = moment(currentTime).add(minsAway, "minutes" ).format("hh:mm A")
    console.log("Next Arrival: " + nextArrival)
      console.log(snapshot.val())
      $('.table > tbody').append('<tr><th scope="row">'+ newvarTrainName  +'</th><td>'+ newvarDestination + '</td><td>'+newvarfrecuency+'</td><td>'+nextArrival + '</td><td>' + minsAway +'</td></tr>' )

    })
    /*setInterval(function() {
      window.location.reload();
    }, 40000);*/
    function onSignIn(googleUser) {
      // Useful data for your client-side scripts:
      var profile = googleUser.getBasicProfile();
      $('.card').css('display', 'block');


      //==============================console===================================================================//
      console.log("ID: " + profile.getId()); // Don't send this directly to your server!
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log("Image URL: " + profile.getImageUrl());
      console.log("Email: " + profile.getEmail());
     //=========================================================================================================//
      // The ID token you need to pass to your backend:
      var id_token = googleUser.getAuthResponse().id_token;
      console.log("ID Token: " + id_token);
    }
    