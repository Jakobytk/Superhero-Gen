// variable for search button
var submitBtn = document.getElementById('submitBtn');
var wikiQueryDiv = document.querySelector('.wikiQuery');
var giphyQueryDiv = document.querySelector('.giphyQuery');
var previousHero = document.getElementById('previous-search');
var logoBar = document.getElementById('navBox');
var logoTitle = document.getElementById('logo-wrapper');
var wikiBox = document.getElementById('wiki-result-box');
var footerBar = document.getElementById('footer-wrapper');

var dcMenu = document.getElementById('dc-menu');
var marvelMenu = document.getElementById('marvel-menu');

var dcList = document.getElementById('dc-list');
var marvelList = document.getElementById('marvel-list');

// selectors for user selection based on DC or Marvel
var dcLogoBtn = document.getElementById('dc-logo-btn');
var marvelLogoBtn = document.getElementById('marvel-logo-btn');


// this listener will create and attach the menus whenever the html finishes loading
document.addEventListener('DOMContentLoaded', attachHeroMenus);

/* 
Searching using a menu is handled by the "change" event listener attached to
each menu, so we only need to account for the remaining case,
which is searching on "Submit" button click
*/
function textInputSearch() {
  var inputValue = document.getElementById('userInput').value.trim();
  // reject an empty search by cancelling execution
  if (!inputValue) return;


  var defaultInput = 'Superhero ';
  var userInput = inputValue;
  var userQuery = defaultInput + inputValue;
  console.log(userInput);

  searchApi(userQuery);
}

submitBtn.addEventListener('click', textInputSearch);

// this function takes query argument and changes wiki url 
// then returns data on each api
function searchApi(userQuery) {
  var wikiQueryUrl = 'https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8=&format=json&origin=*&srlimit=5&srsearch=' + userQuery;
  var giphyQueryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=2Aq30axh0Bdf37VdoDjBnkiUJRXocruK&q=' + userQuery + '&limit=5&offset=0&rating=g&lang=en&bundle=messaging_non_clips';

  var querySuperHero = {
    userQuery
  }

  localStorage.setItem('name', JSON.stringify(querySuperHero));
  console.log(JSON.parse(localStorage.getItem('name')));

  function previousHeroSearch() {
    localStorage.getItem('name',JSON.stringify(userInput.value));
    var heroDiv = document.createElement('p');
    heroDiv.classList.add('previous-hero')
    heroDiv.textContent = ('name',JSON.stringify(userInput.value));
    previousHero.append(heroDiv);
  }
  
  previousHeroSearch();

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
};

/*
  takes each of the arrays and a reference to the menu element
    and attaches <option>s to corresponding <select> input container 
*/
function createHeroMenu(heroesArray, menu) {
  heroesArray.forEach(function (hero) {
    var option = document.createElement('option');
    option.text = hero;
    option.value = 'Superhero ' + hero;
    menu.appendChild(option);
  })
}

/*
calls `createHeroMenu` for each array literal and its corresponding menu selector
*/
function attachHeroMenus() {
  var dcHeroes = [
    'Aquaman',
    'Batman',
    'Beast Boy',
    'Black Adam',
    'Catwoman',
    'Cyborg',
    'Green Arrow',
    'Green Lantern', 
    'Harley Quinn',
    'Joker',
    'Justice League',
    'Lex Luthor',
    'Nightwing',
    'Raven',
    'Robin',
    'Shazam',
    'Starfire',
    'Superman',
    'Supergirl',
    'The Flash',
    'Titans',
    'Wonder Woman',
  ];
  var marvelHeroes = [
    'Adam Warlock',
    'Ant-man',
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
  ];

  createHeroMenu(dcHeroes, dcList)
  createHeroMenu(marvelHeroes, marvelList)
}

/* 
Attach appropriate change listeners to both menus 
*/
[dcList, marvelList].forEach(function (menu) {
  // Change listener with handleOptionChange that gets the value for the <select>
  // menu option click. 
  function handleOptionChange(e) {
    searchApi(e.target.value);
  }

  menu.addEventListener('change', handleOptionChange)
})



function toggleMenu(e) {
  // The following line allows for consolidating the logic for toggling
  // into a single function.
  var menuTargeted = e.target.id === "marvel-logo-btn" ? "marvel" : "dc";

  if (menuTargeted === "marvel") {
    document.body.classList.add('marvel-background');
    marvelMenu.classList.remove('display')
    marvelList.style.display = "block";
    dcMenu.classList.add('display')
    logoBar.style.backgroundColor = "#790000";
    logoTitle.style.backgroundColor = "#790000";
    footerBar.style.backgroundColor = "#790000";
  } else {
    document.body.classList.add('dc-background');
    dcMenu.classList.remove('display')
    dcList.style.display = "block"
    marvelMenu.classList.add('display')
    logoBar.style.backgroundColor = "#0476F2";
    logoTitle.style.backgroundColor = "#0476F2";
    footerBar.style.backgroundColor = "#0476F2";
  }
}

dcLogoBtn.addEventListener('click', toggleMenu);
marvelLogoBtn.addEventListener('click', toggleMenu);

document.getElementById('userInput').addEventListener('keydown', function (e) {
  if (e.which === 13) {
    e.preventDefault();
    getParams();
  }
});

//reset the page to the defualt style
logoTitle.addEventListener('click', function (e) {
  document.body.classList.add('default-bg');
  document.body.classList.remove('marvel-background')
  document.body.classList.remove('dc-background')
  dcMenu.classList.add('display')
  marvelMenu.classList.add('display')
  logoBar.style.backgroundColor = "#b300ff";
  logoTitle.style.backgroundColor = "#b300ff";
  footerBar.style.backgroundColor = "#b300ff";
});

