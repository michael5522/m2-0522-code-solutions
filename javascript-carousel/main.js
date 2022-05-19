var tabContainer = document.querySelector('.tab-container');
var tabAll = document.querySelectorAll('.tab');
var viewAll = document.querySelectorAll('.view');

tabContainer.addEventListener('click', function (event) {
  if (event.target.matches('.tab')) {
    for (var i = 0; i < tabAll.length; i++) {
      if (tabAll[i] !== event.target) {
        tabAll[i].classList.remove('active');
      } else {
        tabAll[i].classList.add('active');
      }
    }

    var dataView = event.target.getAttribute('data-view');
    // if (dataView === 'image1') {
    //   libraryCounter = 0;
    // } else if (dataView === 'image2') {
    //   libraryCounter = 1;
    // } else if (dataView === 'image3') {
    //   libraryCounter = 2;
    // } else if (dataView === 'image4') {
    //   libraryCounter = 3;
    // } else if (dataView === 'image5') {
    //   libraryCounter = 4;
    // }
    for (var j = 0; j < viewAll.length; j++) {
      if (dataView !== viewAll[j].getAttribute('data-view')) {
        viewAll[j].classList.add('hidden');
      } else {
        viewAll[j].classList.remove('hidden');
      }
    }
  }
});

var backButtonAll = document.querySelectorAll('.previous');
for (var i = 0; i < backButtonAll.length; i++) {
  backButtonAll[i].addEventListener('click', function (event) {
    // libraryCounter = 5;
    if (event.target.matches('.one')) {
      for (var p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[4].classList.add('active');
      for (var a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[4].classList.remove('hidden');
    }

    if (event.target.matches('.two')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[0].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[0].classList.remove('hidden');
    }

    if (event.target.matches('.three')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[1].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[1].classList.remove('hidden');
    }

    if (event.target.matches('.four')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[2].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[2].classList.remove('hidden');
    }

    if (event.target.matches('.five')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[3].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[3].classList.remove('hidden');
    }
  });
}

var forwardButtonAll = document.querySelectorAll('.forward');
for (var x = 0; x < forwardButtonAll.length; x++) {
  forwardButtonAll[x].addEventListener('click', function (event) {
    if (event.target.matches('.one')) {
      for (var p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[1].classList.add('active');
      for (var a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[1].classList.remove('hidden');
    }

    if (event.target.matches('.two')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[2].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[2].classList.remove('hidden');
    }

    if (event.target.matches('.three')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[3].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[3].classList.remove('hidden');
    }

    if (event.target.matches('.four')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[4].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[4].classList.remove('hidden');
    }

    if (event.target.matches('.five')) {
      for (p = 0; p < tabAll.length; p++) {
        tabAll[p].classList.remove('active');
      }
      tabAll[0].classList.add('active');
      for (a = 0; a < viewAll.length; a++) {
        viewAll[a].classList.add('hidden');
      }
      viewAll[0].classList.remove('hidden');
    }
  });
}
// var libraryCounter = 0;
// var library = [
//   1, 2, 3, 4, 5
// ];
// setInterval(changeSlide, 3000);

// function changeSlide() {
//   if (libraryCounter === library.length) {
//     libraryCounter = 0;
//   } else {
//     libraryCounter++;
//   }
//   if (libraryCounter === 1) {
//     tabAll[1].classList.add('active');
//     tabAll[0].classList.remove('active');
//     tabAll[2].classList.remove('active');
//     tabAll[3].classList.remove('active');
//     tabAll[4].classList.remove('active');
//     viewAll[1].classList.remove('hidden');
//     viewAll[0].classList.add('hidden');
//     viewAll[2].classList.add('hidden');
//     viewAll[3].classList.add('hidden');
//     viewAll[4].classList.add('hidden');
//   } else if (libraryCounter === 2) {
//     tabAll[2].classList.add('active');
//     tabAll[0].classList.remove('active');
//     tabAll[1].classList.remove('active');
//     tabAll[3].classList.remove('active');
//     tabAll[4].classList.remove('active');
//     viewAll[2].classList.remove('hidden');
//     viewAll[0].classList.add('hidden');
//     viewAll[1].classList.add('hidden');
//     viewAll[3].classList.add('hidden');
//     viewAll[4].classList.add('hidden');
//   } else if (libraryCounter === 3) {
//     tabAll[3].classList.add('active');
//     tabAll[0].classList.remove('active');
//     tabAll[1].classList.remove('active');
//     tabAll[2].classList.remove('active');
//     tabAll[4].classList.remove('active');
//     viewAll[3].classList.remove('hidden');
//     viewAll[0].classList.add('hidden');
//     viewAll[1].classList.add('hidden');
//     viewAll[2].classList.add('hidden');
//     viewAll[4].classList.add('hidden');
//   } else if (libraryCounter === 4) {
//     tabAll[4].classList.add('active');
//     tabAll[0].classList.remove('active');
//     tabAll[1].classList.remove('active');
//     tabAll[2].classList.remove('active');
//     tabAll[3].classList.remove('active');
//     viewAll[4].classList.remove('hidden');
//     viewAll[0].classList.add('hidden');
//     viewAll[1].classList.add('hidden');
//     viewAll[2].classList.add('hidden');
//     viewAll[3].classList.add('hidden');
//   } else if (libraryCounter === 5) {
//     tabAll[0].classList.add('active');
//     tabAll[1].classList.remove('active');
//     tabAll[2].classList.remove('active');
//     tabAll[3].classList.remove('active');
//     tabAll[4].classList.remove('active');
//     viewAll[0].classList.remove('hidden');
//     viewAll[1].classList.add('hidden');
//     viewAll[2].classList.add('hidden');
//     viewAll[3].classList.add('hidden');
//     viewAll[4].classList.add('hidden');
//   }
// }
