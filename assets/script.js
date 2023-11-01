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
  var dcQuery = 'DC Comic Hero'
  var marvelQuery = 'Marvel Hero'

  searchApi(dcQuery, marvelQuery);
}

// this function takes query argument and changes wiki url 
// then returns data on each api
function searchApi(dcQuery, marvelQuery) {
  var wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=';
  var giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q=hero&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';

  if (dcQuery) {
    wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=' + dcQuery;
    giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q='+ dcQuery +'&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';
  }

  if (marvelQuery) {
    wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=' + marvelQuery;
    giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q='+ marvelQuery +'&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';
  }

  fetch(wikiQueryUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data.query.search[0].pageid);
      // var wikiResultUrl = data.query.search[0].pageid;

      fetch(wikiQueryUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data.query.search);
  
        wikiQueryDiv.innerHTML = ''; 
  
        data.query.search.forEach(function (wiki) {
          var wikiQuery = document.createElement('a');
          wikiQuery.textContent = wiki.title;
          wikiQuery.href = 'http://en.wikipedia.org/?curid=' + wiki.pageid;
          wikiQuery.target = '_blank';
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

submitBtn.addEventListener('click', getParams);
dcLogoBtn.addEventListener('click', getParams);
marvelLogoBtn.addEventListener('click', getParams);

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
