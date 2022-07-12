var express = require('express');
var app = express();

let nextId = 1;

const grades = {};

app.get('/api/grades', (req, res) => {
  const container = [];
  for (const property in grades) {
    container.push(grades[property]);
  }
  res.json(container);
});

app.use(express.json());

app.post('/api/grades', (req, res) => {

  const student = req.body;
  student.id = nextId;
  grades[nextId] = student;
  nextId++;

  res.status(201);
  res.json(student);

});
app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');
});
