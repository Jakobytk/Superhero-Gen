// variable for search button
var submitBtn = document.getElementById('submitBtn');
var wikiQueryDiv  = document.querySelector('.wikiQuery');
var giphyQueryDiv  = document.querySelector('.giphyQuery');


function getParams() {
  // Get the queryvalues
  var query = document.getElementById('userInput').value;

  searchApi(query);
}

// this function takes query argument and changes wiki url 
// then returns data on each api
function searchApi(query) {
  var wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=';
  var giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q=hero&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';

  if (query) {
    wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=' + query;
    giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q='+query+'&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';
  }

  fetch(wikiQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });

  fetch(giphyQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    
      giphyQueryDiv.innerHTML = ''; //EMPTY THE GIF

      data.data.forEach(function (giphy) {
        var giphyQuery = document.createElement('div');
        giphyQuery.innerHTML = '<img src="' + giphy.images.fixed_height.url + '">';
        giphyQueryDiv.appendChild(giphyQuery);
    });
  });
}

submitBtn.addEventListener('click', getParams);

document.getElementById('userInput').addEventListener('keydown', function (e) {
  if (e.which === 13) {
    e.preventDefault();
    getParams();
  }
});