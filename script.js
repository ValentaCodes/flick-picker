// Welcome
let searchButton = document.getElementById("searchButton"); //Gets search button from HTML
let previousMoviePoster = [];
let previousSearchedMovies = [];

// This Api gets user data from Search input and returns Youtube data
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
      trailerEl.setAttribute("src", `https://www.youtube.com/embed/${videoId}`);
      console.log(`youtube trailer url - www.youtube.com/watch?v=${videoId}`); //this logs the youtube url directly to corresponding trailer
    });
};

// This Api gets needed data from OMDB
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
      let grabMovieRatings = () => {
        for (i = 0; i < data.Ratings.length; i++) {
          let ratingSource = data.Ratings[i].Source;
          let criticRatings = data.Ratings[i].Value;
          console.log(`${ratingSource} - ${criticRatings}`); // this console.log shows us ratings and source
        }

        // these statements compare rotten tomatoes data and displays our flick suggestion
        let rottenTomatoRating = data.Ratings[1].Value; //grabs rotten data
        if (rottenTomatoRating < "20") {
          let flickMessage = document.getElementById("flickMessage"); // grabs text area from html
          flickMessage.textContent = "Go Touch Grass"; //sets text area to string
          console.log("Go Touch Grass");
        } else if (rottenTomatoRating > "21" && rottenTomatoRating < "50") {
          flickMessage.textContent = "Do Not Flick";
          console.log("Do Not Flick");
        } else if (rottenTomatoRating > "51" && rottenTomatoRating < "80") {
          flickMessage.textContent = "Partial Flick";
          console.log("Partial Flick");
        } else {
          flickMessage.textContent = "Certified Flick";
          console.log("Certified Flick");
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
        // Initializes variables needed to display API from HTML
        let posterEl = document.getElementById("currentMoviePoster");
        let genreEl = document.getElementById("genre");
        let ratingEl = document.getElementById("rated");
        let runtimeEl = document.getElementById("runtime");
        let plotEl = document.getElementById("plotMessage");
        let imdbEl = document.getElementById("imdbRating");
        let rottenEl = document.getElementById("rottenRating");
        let metaEl = document.getElementById("metaRating");
        // Sets text area with data
        imdbEl.textContent = `${data.Ratings[0].Value}`;
        rottenEl.textContent = `${data.Ratings[1].Value}`;
        metaEl.textContent = `${data.Ratings[2].Value}`;
        plotEl.textContent = data.Plot;
        genreEl.textContent = data.Genre;
        ratingEl.textContent = data.Rated;
        runtimeEl.textContent = data.Runtime;
        posterEl.setAttribute("src", moviePosterUrl);
        // sets url poster data in localStorage
        previousMoviePoster.push(data.Poster);
        localStorage.setItem("poster", JSON.stringify(previousMoviePoster));

        // sets movie title into storage
        previousSearchedMovies.push(data.Title);
        localStorage.setItem("movie", JSON.stringify(previousSearchedMovies));
      };
      grabMovieRatings();
      grabMovieData();
      grabPreviousMoviePoster();
    });
};

// grabs poster from storage
let grabPreviousMoviePoster = () => {
  let poster = JSON.parse(localStorage.getItem("poster"));
  let imageEl = document.getElementsByTagName("img");
  imageEl[0].setAttribute("src", poster.at(-1));
  imageEl[1].setAttribute("src", poster.at(-2));
  imageEl[2].setAttribute("src", poster.at(-3));
};
// grabs movie title from storage
const movie = JSON.parse(localStorage.getItem("movie")) || [];

// posterEl[1].setAttribute('src', )
// sets previous user input in localStorage

// when search button is clicked fires API call functions
searchButton.addEventListener("click", function () {
  getYoutubeData();
  getOmdbData();
  // getNytData();
});

// function getNytData(){
//   let apiUrl = "https://api.themoviedb.org/3/search/movie?";
//   let movieDatabaseApi = "api_key=f20b350a17e1a84ff4f6a673acb57504&query=";
//   let movieDatabaseInformation = '&language=en-US&page=1&include_adult=false&region=us';
//   let userSearch = movieSearch.value;
//   let result = apiUrl + movieDatabaseApi + encodeURI(userSearch) + movieDatabaseInformation

//   fetch(result)
//   .then(function (response) {
//     return response.json();
//   })
//   .then(function (data) {
//       //used to grab the contents from the API Request
//     let movieReview = data.results[0].id
//         console.log(data)
//         console.log(movieReview)
//       })

// }
