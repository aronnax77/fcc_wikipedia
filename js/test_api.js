// get a reference to the results para
var results = document.querySelector('.results');

var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=Te';
var responseObj;

// create a request object
var request = new XMLHttpRequest();

function getData() {
  request.open('GET', url);
  request.response = 'json';
  request.send();

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status === 200) {
        responseObj = JSON.parse(request.response);
      } else {
        alert('There was a problem with the request.');
      }
    }
    results.textContent = request.response;
  };
}

window.onload = getData();
