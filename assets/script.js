// variable for search button
var submitBtn = document.getElementById('submitBtn');
var logoBar = document.getElementById('logo-wrapper');
var footerBar = document.getElementById('footer-wrapper');
var logoTitle = document.querySelector('.logo-title');
var wikiQueryDiv  = document.querySelector('.wikiQuery');
var giphyQueryDiv  = document.querySelector('.giphyQuery');
var previousHero = document.getElementById('previous-search');

// selectors for user selection based on DC or Marvel
var dcLogoBtn = document.getElementById('dc-logo-btn');
var marvelLogoBtn = document.getElementById('marvel-logo-btn');          


function getParams() {
  // Get the queryvalues
  var dcQuery = 'DC Comic Hero';
  var marvelQuery = 'Marvel Hero';
  var userQuery = 'superhero ' + document.getElementById('userInput').value;
  var query = dcQuery;
  //determine which query to use//
  searchApi(userQuery);
}

// this function takes query argument and changes wiki url 
// then returns data on each api
function searchApi(userQuery) {
  var wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=' + userQuery;
  var giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q=' + userQuery + '&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';


  var querySuperHero = {userQuery}
    localStorage.setItem('name',JSON.stringify(querySuperHero));
    console.log(JSON.parse(localStorage.getItem('name'))); 


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
});
};

function showDC () {
  console.log('DC');
}

function showMarvel() {
  var marvelArr = [
    'Adam Warlock',
    'Antman',
    'Avengers',
    'Black Panther',
    'Black Widow',
    'Captain America',
    'Captain Marvel',
    'Daredevil',
    'Deadpool',
    'Dr. Strange',
    'Eternals',
    'Fantastic Four',
    'Groot',
    'Hawkeye',
    'Hulk',
    'Iron Man',
    'Loki',
    'Moon Knight',
    'Punisher',
    'Rocket Raccoon',
    'Spider-Man',
    'Spider-Man (Miles Morales)',
    'Spider-Man (Peter Parker',
    'Thor',
    'Wolverine',
    'X-Men'
  ]

  marvelArr.forEach(function(option) {
    var marvelMenu = document.getElementById('marvel-list');
    var marvelOption = document.createElement('option');
    marvelOption.text = option;
    marvelOption.value = option;
    marvelMenu.appendChild(marvelOption);

    console.log(option);
  });

}

submitBtn.addEventListener('click', getParams);
dcLogoBtn.addEventListener('click', getParams);
marvelLogoBtn.addEventListener('click', showMarvel);

document.getElementById('userInput').addEventListener('keydown', function (e) {
  if (e.which === 13) {
    e.preventDefault();
    getParams();
  }
});

//reset the page to the defualt style
logoTitle.addEventListener('click', function (e) {
  logoBar.style.backgroundColor = "#7800ac";
  footerBar.style.backgroundColor = "#7800ac";
});

//set the page to the Marvel style
marvelLogoBtn.addEventListener('click', function (e) {
  logoBar.style.backgroundColor = "#EC1D24";
  footerBar.style.backgroundColor = "#EC1D24";
});

//reset the page to the DC style
dcLogoBtn.addEventListener('click', function (e) {
  logoBar.style.backgroundColor = "#0476F2";
  footerBar.style.backgroundColor = "#0476F2";
});
