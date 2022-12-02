let youtubeApiKey = "&key=AIzaSyAmVkvs3VVUOiXnF5hL7XGCk5kWBsxNLBY";
let youtubeApiInformation = "trailer&type=video&order=relevance&maxResults=1";
let apiUrl = "https://www.googleapis.com/youtube/v3/search?part=snippet&q=";
let searchButton = document.getElementById("searchButton");

let getYoutubeData = () => {
  let userSearch = movieSearch.value;
  let result = apiUrl + userSearch + youtubeApiInformation + youtubeApiKey;
  fetch(result)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      let videoId = data.items[0].id[1];
      console.log(videoId);
    });
};

searchButton.addEventListener("click", function () {
  getYoutubeData();
});
