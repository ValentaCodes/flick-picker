let searchButton = document.getElementById("searchButton"); //Gets search button from HTML
let previousMoviePoster = []; // initializes empty array for previous poster storage
let previousSearchedMovies = []; // initializes empty array for movie title storage

// This Api gets user data from Search input and returns Youtube data
let getYoutubeData = () => {
  let apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="; //main youtube API URL
  let userSearch = movieSearch.value;
  let youtubeApiInformation =
    "trailer&channelTitle=rottentomatoes&topicId=/m/02vxn&type=video&order=relevance&maxResults=1"; // API parameters that allows use to receive most relevant title
  let youtubeApiKey = "&key=AIzaSyAmVkvs3VVUOiXnF5hL7XGCk5kWBsxNLBY"; //Youtube API Key
  let result = apiUrl + userSearch + youtubeApiInformation + youtubeApiKey;
  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
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
  let OmdbApiKey = "&type=movie&apikey=749bae52"; // apiKey
  let userSearch = movieSearch.value; //user search is the movie search bar value
  let result = apiUrl + userSearch + OmdbApiKey; // this concats all above information

  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // this function loops through the data rating and grabs the ratings source "IMDB" and their rating "5.5/10"
      let grabMovieRatings = () => {
        let flickMessage = document.getElementById("flickMessage"); // grabs text area from html

        for (i = 0; i < data.Ratings.length; i++) {
          let ratingSource = data.Ratings[i].Source;
          let criticRatings = data.Ratings[i].Value;
          console.log(`${ratingSource} - ${criticRatings}`); // this console.log shows us ratings and source
        }
        // if there isn't enough data, do this
        if (data.Ratings.length < 3) {
          let posterEl = document.getElementById("currentMoviePoster");
          let errorPoster = document.getElementById("errorPoster");
          flickMessage.textContent =
            "Not enough data to certify this flick. Please be explicit. 'Anchorman: Legend of Ron burgundy'";
          posterEl.setAttribute("src", errorPoster.src);
        }
        // these statements compare rotten tomatoes data and displays our flick suggestion
        let rottenTomatoRating = data.Ratings[1].Value; //grabs rotten data
        if (rottenTomatoRating < "20") {
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
        // sets url poster data in Session Storage
        previousMoviePoster.push(data.Poster);
        sessionStorage.setItem("poster", JSON.stringify(previousMoviePoster));

        // sets movie title into Session Storage
        previousSearchedMovies.push(data.Title);
        sessionStorage.setItem("movie", JSON.stringify(previousSearchedMovies));
      };
      grabMovieRatings();
      grabMovieData();
      grabPreviousMoviePoster();
      grabPreviousMovieTitle();
    });
};

// grabs poster from storage and sets in recent
let grabPreviousMoviePoster = () => {
  let poster = JSON.parse(sessionStorage.getItem("poster"));
  let imageEl = document.getElementsByTagName("img");
  imageEl[0].setAttribute("src", poster.at(-1));
  imageEl[1].setAttribute("src", poster.at(-2));
  imageEl[2].setAttribute("src", poster.at(-3));
};

// grabs movie title from storage and sets it to corresponding movie
let grabPreviousMovieTitle = () => {
  let movie = JSON.parse(sessionStorage.getItem("movie"));
  let prevMovieEl = document.querySelectorAll("#prevMovieTitle");
  prevMovieEl[0].textContent = movie.at(-1);
  prevMovieEl[1].textContent = movie.at(-2);
  prevMovieEl[2].textContent = movie.at(-3);
};

// when search button is clicked fires API call functions
searchButton.addEventListener("click", function () {
  // catches if user didn't enter a movie and returns message
  if (movieSearch.value === "") {
    searchBar.textContent = "Must enter flick";
    return;
  }
  getYoutubeData();
  getOmdbData();
});

// adds key listener so users can search a movie when they hit the enter key
const input = document.querySelector("input");
input.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "Enter") {
    if (movieSearch.value === "") {
      searchBar.textContent = "Must enter flick";
      return;
    }
    getYoutubeData();
    getOmdbData();
  }
});
