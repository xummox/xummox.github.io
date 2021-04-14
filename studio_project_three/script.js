// console.log("is our script file working?");

// load the airtable library, call it "Airtable";
var Airtable = require("airtable");
// console.log(Airtable);

// use airtable library, connect to our base using API key
var base = new Airtable({ apiKey: "keyZ1peaK6cK14vts" }).base(
    "appO0ZYP7kfDQ8HJ1"
  );

// get our collection base, select all the records
// specify functions that will receive the data 
base("feelings")
  .select({})
  .eachPage(gotPageOfFeels, gotAllFeels);

// an empty array to hold our data
var feels = [];

// callback function that receives our data
function gotPageOfFeels(records, fetchNextPage) {
    console.log("gotPageOfFeels()");
    // add the records from this page to our array
    feels.push(...records);
    // request more pages
    fetchNextPage();
  }

// call back function that is called when all pages are loaded
  function gotAllFeels(err) {
    console.log("gotAllFeels()");  

  // report an error, you'd want to do something better than this in production
  if (err) {
    console.log("error loading data");
    console.error(err);
    return;
  }

  // call functions to log and show the books
  consoleLogFeels();
  showFeels();
}

// just loop through the books and console.log them
function consoleLogFeels() {
    console.log("consoleLogFeels()");
    feels.forEach(feel => {
      console.log("feel:", feel);
    });
  }

// look through our airtable data, create elements
function showFeels() {
    console.log("showFeels()");
    feels.forEach(feel => {
      
     

      //var frameDimension = document.createElement("p");
      //frameDimension.innerText = frame.fields.dimension;
      //document.body.append(frameDimension);

      //var frameImage = document.createElement("img");
      //frameImage.classList.add("song-image");
      //frameImage.src = frame.fields.photo_frame_image[0].url;
      //document.body.append(frameImage);

      // create container for each song
    var feelContainer = document.createElement("div");
    feelContainer.classList.add("feel-container");
    document.querySelector(".container").append(feelContainer);

    // add song titles
    
    var feelThoughts = document.createElement("h1");
    feelThoughts.classList.add("feel-thoughts");
    feelThoughts.innerText = feel.fields.thoughts;
    feelContainer.append(feelThoughts);

    var feelAudio = document.createElement("audio");
    feelAudio.classList.add("feel-audio");
    feelAudio.innerText = feel.fields.audio;
    feelContainer.append(feelAudio);

    var feelImage = document.createElement("img");
    feelImage.classList.add("feel-image");
    feelImage.src = feel.fields.image[0].url;
    feelContainer.append(feelImage);

    feelContainer.addEventListener("click", function(event) {
    feelAudio.classList.toggle("active");
    feelImage.classList.toggle("active");
      });



    });
}