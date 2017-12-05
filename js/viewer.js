var url, responseObj, request;


var TESTING = false;
var btn = document.querySelector('button');
var chb = document.querySelector('#random');
var sch = document.querySelector('#search');
var res = document.querySelector('.result');
res.style.display = 'inline';
res.textContent = ' ';
sch.value = '';
sch.placeholder = 'e.g. Elephant';
sch.focus();
btn.addEventListener('click', search);

function search() {
  res.textContent = ' ';
  //alert('in search');
  //request = new XMLHttpRequest();
  if(TESTING === true){
    url = "assets/data.json";
    alert(chb.value);
    res.textContent = 'not working now';
  } else if (sch.value === '') {
    res.textContent = '*Please enter a search string and try again';
    res.style.backgroundColor = 'pink';
    return false;
  } else if(chb.checked === true) {
    alert('chb.checked = ' + chb.checked);
    res.textContent = 'It works';
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
        //alert(responseObj);
        renderArticles();
        //writePara(responseObj);
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
  alert('length = ' + responseObj[1].length);
  for(var i = 0; i < 10; i++) {
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
}
