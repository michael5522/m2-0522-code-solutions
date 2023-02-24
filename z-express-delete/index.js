const express = require('express');
const app = express();

const grades = {
  12: {
    id: 12,
    name: 'Tim Berners-Lee',
    course: 'HTML',
    score: 95
  },
  47: {
    id: 47,
    name: 'Brendan Eich',
    course: 'JavaScript',
    score: 100
  },
  273: {
    id: 273,
    name: 'Forbes Lindsay',
    course: 'JavaScript',
    score: 92
  }
};

app.get('/api/grades', (req, res) => {
  const array = [];
  for (const prop in grades) {
    array.push(grades[prop]);
  }
  res.json(array);
});

app.delete('/api/grades/:id', (req, res) => {
  if (!grades[req.params.id]) {

    res.status(400).send('this Id doesnt exist');
  } else {
    delete grades[req.params.id];
    res.sendStatus(204);
  }

});

app.listen(3000, () => {
  // console.log('running @ 3000');
});
