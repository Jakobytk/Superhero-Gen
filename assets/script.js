// variable for search button
var submitBtn = document.getElementById('submitBtn');
var logoBar = document.getElementById('logo-wrapper');
var logoTitle = document.querySelector('.logo-title');
var wikiQueryDiv  = document.querySelector('.wikiQuery');
var giphyQueryDiv  = document.querySelector('.giphyQuery');

// selectors for user selection based on DC or Marvel
var dcLogoBtn = document.getElementById('dc-logo-btn');
var marvelLogoBtn = document.getElementById('marvel-logo-btn');          


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
    giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q='+ query +'&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';
  }

  fetch(wikiQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      fetch(wikiQueryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.query.search);
  
        wikiQueryDiv.innerHTML = ''; 
  
        data.query.search.forEach(function (wiki) {
          var wikiQuery = document.createElement('div');
          wikiQuery.innerHTML = wiki.title;
          wikiQueryDiv.appendChild(wikiQuery);
      });
    });

  fetch(giphyQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    
      giphyQueryDiv.innerHTML = '';

      data.data.forEach(function (giphy) {
        var giphyQuery = document.createElement('div');
        giphyQuery.innerHTML = '<img src="' + giphy.images.fixed_height.url + '">';
        giphyQueryDiv.appendChild(giphyQuery);
    });
  });
})
}

function showDC () {
  console.log('DC');
}

function showMarvel() {
  console.log('Marvel');
}

//submitBtn.addEventListener('click', getParams);
dcLogoBtn.addEventListener('click', showDC);
marvelLogoBtn.addEventListener('click', showMarvel);

document.getElementById('userInput').addEventListener('keydown', function (e) {
  if (e.which === 13) {
    e.preventDefault();
    getParams();
  }
});

//reset the page to the defualt style
logoTitle.addEventListener('click', function (e) {
  logoBar.style.backgroundColor = "#b300ff";
});

//set the page to the Marvel style
marvelLogoBtn.addEventListener('click', function (e) {
  logoBar.style.backgroundColor = "#EC1D24";
});

//reset the page to the DC style
dcLogoBtn.addEventListener('click', function (e) {
  logoBar.style.backgroundColor = "#0476F2";
});