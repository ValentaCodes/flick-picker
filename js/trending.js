fetch(
  "https://api.themoviedb.org/3/trending/movie/week?api_key=f20b350a17e1a84ff4f6a673acb57504"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    let movieTitle = document.getElementById("movieTitle");
    let moviePlot = document.getElementById("moviePlot");
    let movieRelease = document.getElementById("releaseDate");
    let moviePoster = document.getElementById("moviePoster");
    let poster = `https://image.tmdb.org/t/p/w500/${data.results[0].poster_path}`;
    movieTitle.textContent = data.results[0].title;
    moviePlot.textContent = data.results[0].overview;
    movieRelease.textContent = data.results[0].release_date;
    moviePoster.setAttribute("src", poster);
  });
