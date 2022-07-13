var express = require('express');
var app = express();
const fs = require('fs');

app.get('/api/notes', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    const dataNotes = dataObj.notes;

    const container = [];

    for (const property in dataNotes) {
      container.push(dataNotes[property]);
    }
    res.status(200);
    res.json(container);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const idNumber = parseInt(req.params.id);

  if (idNumber < 0) {
    res.status(400).json({
      error: 'id must be a positive integer'
    });
    return;
  }
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    const dataNotes = dataObj.notes;

    for (const property in dataNotes) {
      const singleNoteID = dataNotes[property].id;
      if (singleNoteID === idNumber) {
        res.status(200);
        res.json(dataNotes[property]);
        return;
      }

    }
    res.status(404).json({
      error: `cannot find note with id ${idNumber}`
    });

  });
});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');

});
