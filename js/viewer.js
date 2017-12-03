var url = "assets/data.json";
var responseObj;

var request = new XMLHttpRequest();

function getData() {
  request.open('GET', url);
  request.response = 'json';
  request.send();


  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        responseObj = JSON.parse(request.response);
        out();
        //writePara(responseObj);
      } else {
        alert('There was a problem with the request.');
      }
    }
    //console.log(responseObj);
  };
}

getData();

//var el = document.querySelector('.out');
//alert(el);

/*function writePara(arg) {
  var arr = JSON.parse(arg);
  alert('In para');
  alert(typeof arg);
  alert(arr[1][2]);
  el.textContent = arr[1][2];
}*/

function out() {
  var obj = JSON.parse(responseObj);
  var article = document.createElement('article');
  var sect = document.querySelector('section');
  var heading = document.createElement('h2');
  var para    = document.createElement('p');
  heading.textContent = obj[1][2];
  para.textContent    = obj[2][2];
  article.appendChild(heading);
  article.appendChild(para);
  sect.appendChild(article);
  sect.addEventListener('click', openWindow);
  sect.url = "https://en.wikipedia.org/wiki/Television_program";

  function openWindow(evt) {
    alert('In open window');
    alert(evt.target);
    window.open(sect.url, "_blank");
  }
}


/*var search = document.querySelector('#first');
search.addEventListener('click', openWindow);
search.url = "https://en.wikipedia.org/wiki/Television_program";

function openWindow(evt) {
  alert('In open window');
  alert(evt.target);
  window.open(evt.target.url, "_blank");
}*/
