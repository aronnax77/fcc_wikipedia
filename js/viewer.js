var url, responseObj, request;


var TESTING = false;
var btn = document.querySelector('button');
var chb = document.querySelector('#random');
var sch = document.querySelector('#search');
var res = document.querySelector('.result');
btn.addEventListener('click', search);

res.textContent = 'lot and lot';

function search() {
  //alert('in search');
  //request = new XMLHttpRequest();
  if(TESTING === true){
    url = "assets/data.json";
    alert(chb.value);
    res.textContent = 'not working now';
  } else if(chb.value === 'on') {
    alert(chb.value);
    alert('in if else');
    res.textContent = 'It works';
  } else {
    //alert('in else');
    url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=' + sch.value;
    //alert(url);
    //alert(request);
  }
//alert(request);
//alert(url);
getData(url);
//getAlert();
}

function getAlert() {
  alert('in getAlert');
  alert(request);
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
//renderArticles(responseObj);
//getData();

function renderArticles() {
  var section = document.querySelector('section');

  while(section.firstChild) {
    section.removeChild(section.firstChild);
  }

  for(var i = 0; i < 10; i++) {
    addArticle(i);
  }

  function addArticle(itemNo) {
    //res.textContent = JSON.parse(responseObj);
      //var obj = responseObj;
      //res.textContent = obj[1][1];
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
      //alert('article.url = ' + article.url);

      function openWindow(evt) {
        //alert('In open window');
        //alert(evt.target);
        //alert(evt.target.url);
        window.open(this.url, "_blank");
      }
  }
}
