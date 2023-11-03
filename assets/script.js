// variable for search button
var submitBtn = document.getElementById('submitBtn');
var logoBar = document.getElementById('logo-wrapper');
var logoTitle = document.querySelector('.logo-title');
var wikiQueryDiv = document.querySelector('.wikiQuery');
var giphyQueryDiv = document.querySelector('.giphyQuery');
var previousHero = document.getElementById('previous-search');

var dcMenu = document.getElementById('dc-list');
var marvelMenu = document.getElementById('marvel-list');

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

  var userQuery = 'superhero ' + inputValue;
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
  // This seems to be working, I noticed the log in the dev console.
  // You could attach another 'DOMContentLoaded' listener to the document,
  //    and in the handler function, check if the last search is stored,
  //    just like you've done with your JSON.parse here,
  //    and if it has, call this `searchApi` function with the stored item
  //    so that the page is populated with data from the last search on load.
  localStorage.setItem('name', JSON.stringify(querySuperHero));
  console.log(JSON.parse(localStorage.getItem('name')));

  function previousHeroSearch() {
    localStorage.getItem('name',JSON.stringify(querySuperHero));
    var heroDiv = document.createElement('p');
    heroDiv.textContent = ('name',JSON.stringify(querySuperHero));
    previousHero.append(heroDiv);
  }
  
  previousHeroSearch();



  // Removed the unnecessary fetch that both of the following were nested within
  // We can fetch separately without worrying about asynchronicity because
  //   the data affects entirely different elements in each case.
  // In other words, we don't know which fetch will return data first, but
  //   that's okay in this case.

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
- see bottom of function for calls to `createHeroMenu`
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
    'Green Lanter', // typo here
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
  ];

  /*dcMenu && marvelMenu selectors are on the global scope,
  so that they can be referenced again within other functions
  - see `toggleMenu` function below
  */
  createHeroMenu(dcHeroes, dcMenu)
  createHeroMenu(marvelHeroes, marvelMenu)
}

/* 
Attach appropriate change listeners to both menus 
There's no need to distinguish them here since they both do the same thing.
That is - calling the `searchApi` function with the value of the option that was clicked
*/
[dcMenu, marvelMenu].forEach(function (menu) {
  // The <select> menu itself is the target whose value changes
  // when one of the <option>s within is clicked.
  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/select
  function handleOptionChange(e) {
    searchApi(e.target.value)
  }

  menu.addEventListener('change', handleOptionChange)
})

function toggleMenu(e) {
  // The following line allows for consolidating the logic for toggling
  // into a single function.
  // All we need to know is which menu to manipulate, so we use the id
  // of the target that was clicked, because it uniquely identifies each one.
  // Ternary operator: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Conditional_operator
  var menuTargeted = e.target.id === "marvel-logo-btn" ? "marvel" : "dc";

  if (menuTargeted === "marvel") {
    document.body.classList.add('marvel-background');
    marvelMenu.style.display = "block";
    dcMenu.style.display = "none";
    logoBar.style.backgroundColor = "#EC1D24";
  } else {
    document.body.classList.add('dc-background');
    dcMenu.style.display = "block"
    marvelMenu.style.display = "none"
    logoBar.style.backgroundColor = "#0476F2";
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
  logoBar.style.backgroundColor = "#b300ff";
});

/* 
  The following actions could be moved to the `toggleMenu` function,
  eliminating the need to duplicate click listeners
*/

//set the page to the Marvel style
// marvelLogoBtn.addEventListener('click', function (e) {
//   logoBar.style.backgroundColor = "#EC1D24";
// });

// //reset the page to the DC style
// dcLogoBtn.addEventListener('click', function (e) {
//   logoBar.style.backgroundColor = "#0476F2";
// });
