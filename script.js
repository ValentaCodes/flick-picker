let youtubeApiKey = "&key=AIzaSyAmVkvs3VVUOiXnF5hL7XGCk5kWBsxNLBY"; //Youtube API Key
let youtubeApiInformation = "trailer&type=video&order=relevance&maxResults=1"; // API parameters that allows use to receive most relevant title
let apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q="; //main youtube API URL
let searchButton = document.getElementById("searchButton"); //Gets search button from HTML

// This Api gets user data from Search input and returns JSON data
let getYoutubeData = () => {
  let userSearch = movieSearch.value;
  let result = apiUrl + userSearch + youtubeApiInformation + youtubeApiKey;
  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // This retrieves the youtube video ID. for example www.youtube.com/watch?v=xxxxx
      // With "v=" representing our video ID
      let videoId = data.items[0].id.videoId;
      console.log(videoId);
    });
};

// when search button is clicked fires above function
searchButton.addEventListener("click", function () {
  getYoutubeData();
});
