let searchButton = document.getElementById("searchButton"); //Gets search button from HTML


// This Api gets user data from Search input and returns JSON data
let getYoutubeData = () => {
  let youtubeApiKey = "&key=AIzaSyAmVkvs3VVUOiXnF5hL7XGCk5kWBsxNLBY"; //Youtube API Key
  let youtubeApiInformation = "trailer&type=video&order=relevance&maxResults=1"; // API parameters that allows use to receive most relevant title
  let apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="; //main youtube API URL
  let userSearch = movieSearch.value;
  let result = apiUrl + userSearch + youtubeApiInformation + youtubeApiKey;
  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // commented out log below out because I'm grabbing what we need already.
      // No need for digging! uncomment log below if you want to see full API data
      // console.log(data);
      // This retrieves the youtube video ID. for example www.youtube.com/watch?v=xxxxx
      let videoId = data.items[0].id.videoId;
      let trailerEl = document.getElementById("video");
      // CURRENTLY WORKING ON 📍
      // trying to get youtube url to render with iframe, running into video loading
      trailerEl.setAttribute(
        "src",
        `https://www.youtube.com/embed/watch?v=${videoId}`
      );
      console.log(`youtube trailer url - www.youtube.com/watch?v=${videoId}`); //this logs the youtube url directly to corresponding trailer
    });
};

// function that gets needed data from OMDB
let getOmdbData = () => {
  let apiUrl = "https://www.omdbapi.com/?t="; //apiURL with title parameter at the end
  let OmdbApiKey = "&apikey=749bae52"; // apiKey
  let userSearch = movieSearch.value; //user search is the movie search bar value
  let result = apiUrl + userSearch + OmdbApiKey; // this concats all above information

  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data); I commented this out because I'm grabbing all relevant data below
      // this function loops through the data rating and grabs the ratings source "IMDB" and their rating "5.5/10"
      let grabMovieReviews = () => {
      
        for (i = 0; i < data.Ratings.length; i++) {
          let ratingSource = data.Ratings[i].Source;
          let criticRatings = data.Ratings[i].Value;
          console.log(`${ratingSource} - ${criticRatings}`); // this console.log shows us ratings and source
        }
        //add "IF" statement
        if (data.Ratings <= 20) {
          console.log("Go Touch Grass");
        } else if (data.Ratings >= 21 && data.Ratings <=50) {
          console.log("Do Not Flick");
        } else if (data.Ratings >=51 && data.Ratings <=80) {
          console.log("Partial Flick");
        } else {console.log("Certified Flick");
        }
       };
      //this function grabs movie data we will need to display
      let grabMovieData = () => {
        let movieGenre = data.Genre;
        let movieRating = data.Rated;
        let movieTitle = data.Title;
        let moviePlot = data.Plot;
        let movieRuntime = data.Runtime;
        let moviePosterUrl = data.Poster;
        console.log(`Poster URL ${moviePosterUrl}`);
        console.log(
          `Title:${movieTitle}, 
        Genre:${movieGenre}, 
        Rated:${movieRating},
        Plot:${moviePlot},
        Runtime:${movieRuntime},
          `
        );
      };
      grabMovieReviews();
      grabMovieData();
    });
};

// when search button is clicked fires API call functions
searchButton.addEventListener("click", addResult);

function main(){
  //getYoutubeData();
  //getOmdbData();
  addResult();
}

function addResult(event){

  //prevent default
  event.preventDefault();
  console.log(event);
  
  var searchRes = gdata + sInput.value;
  gData.textContent = searchRes;
}

