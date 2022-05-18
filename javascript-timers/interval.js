var start = setInterval(countdown, 1000);

var counter = 3;
function countdown() {
  var element = document.querySelector('.countdown-display');

  element.textContent = counter;
  counter--;
  if (counter === -1) {
    element.textContent = '~Earth Beeeelooowww Us~';
    clearInterval(start);
  }
}
