var url, responseObj, request;


var TESTING = false;
var btn = document.querySelector('button');     // Search button
var rand = document.querySelector('#random');   // Randowm search button
var sch = document.querySelector('#search');    // Search input box
var notice = document.querySelector('.notice'); // Warning notice
notice.style.display = 'inline';
notice.textContent = ' ';
sch.value = '';
sch.placeholder = 'e.g. Elephant';
sch.focus();
btn.addEventListener('click', search);
rand.addEventListener('click', getRandomArticle);

function search() {
  notice.textContent = ' ';
  if (sch.value === '') {
    notice.textContent = '*Please enter a search string and try again';
    notice.style.backgroundColor = 'pink';
    return false;
  } else {
    url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + sch.value;
  }

getData(url);

}


function getData(source) {
  request = new XMLHttpRequest();
  request.open('GET', url);
  request.response = 'json';

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        responseObj = JSON.parse(request.response);
        renderArticles();
      } else {
        alert('There was a problem with the request.');
      }
    }
  };

  request.send();

}

function renderArticles() {
  var section = document.querySelector('section');

  while(section.firstChild) {
    section.removeChild(section.firstChild);
  }
  for(var i = 0; i < responseObj[1].length; i++) {
    addArticle(i);
  }

  function addArticle(itemNo) {

      var section = document.querySelector('section');
      var article = document.createElement('article');
      var heading = document.createElement('h2');
      var para    = document.createElement('p');

      heading.textContent = responseObj[1][itemNo];
      para.textContent    = responseObj[2][itemNo];
      article.appendChild(heading);
      article.appendChild(para);
      section.appendChild(article);

      article.addEventListener('click', openWindow);
      article.url = responseObj[3][itemNo];

      function openWindow(evt) {
        window.open(this.url, "_blank");
      }
  }
  // Reinstate search box status
  sch.value = '';
  sch.placeholder = 'e.g. Elephant';

}

function getRandomArticle() {
  window.open("https://en.wikipedia.org/wiki/Special:Random", "_blank");
}
