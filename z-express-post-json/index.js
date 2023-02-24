const express = require('express');
const app = express();
/* eslint-disable no-console */
let nextId = 1;
const grades = {};

app.get('/api/grades', (req, res) => {
  const container = [];
  for (const property in grades) {
    container.push(grades[property]);
  }
  res.json(container);
});

const middleWare = express.json();
app.use(middleWare);

app.post('/api/grades', (req, res) => {

  const gg = grades[nextId] = req.body;
  grades[nextId].id = nextId;
  nextId++;
  console.log(grades, nextId);
  res.status(201).json(gg);
});

app.listen(3000, () => {
  console.log('listening at 3000 brh');
});
