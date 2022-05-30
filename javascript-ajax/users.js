var element = document.querySelector('#user-list');
console.log(element);
var pp;
function ggRE() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'http://jsonplaceholder.typicode.com/users');
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);
    pp = xhr.response;
    for (var i = 0; i < pp.length; i++) {
      console.log(pp[i].name);
      var liElement = document.createElement('li');
      liElement.textContent = pp[i].name;
      element.appendChild(liElement);
    }
  });
  xhr.send();
}

ggRE();
