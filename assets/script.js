// variable for search button
var submitBtn = document.getElementById('');


function getParams() {
  // Get the queryvalues
  var query = document.getElementById('').value;

  searchApi(query);
}

// this function takes query argument and changes wiki url 
// then returns data on each api
function searchApi(query) {
  var wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=hell';
  var giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q=hero&limit=25&offset=0&rating=g&lang=en&bundle=messaging_non_clips';

  if (query) {
    wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=20&srsearch=' + query;
  }

  fetch(wikiQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })

  fetch(giphyQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
}

submitBtn.addEventListener('click', getParams);
