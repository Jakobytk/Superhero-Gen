// variable for search button
var submitBtn = document.getElementById('submitBtn');


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
    })

  fetch(giphyQueryUrl, {
    headers: {
      'Content-Type': 'application/json',
      
    }
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var gifBox = document.getElementById("container");
      for (var i = 0; i < data.data.length; i++){
        var gifList = document.createElement("img");
      gifList.setAttribute("src", data.data[i].embed_url);
      gifBox.append(gifList);
      }
      console.log(gifList);
    })
}

submitBtn.addEventListener('click', getParams);


