let variable = 3;

var gg = setInterval(function () {

  if (variable === 0) {
    console.log('blast off!');
    clearInterval(gg);
    return;
  }
  console.log(variable);
  variable--;
}, '1000');
