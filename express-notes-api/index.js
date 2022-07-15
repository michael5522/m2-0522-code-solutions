var express = require('express');
var app = express();
const fs = require('fs');
app.use(express.json());

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

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  if (!newNote.content) {
    res.status(400).json({
      error: 'content is a required field'
    });
    return;
  }

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({
        error: 'An unexpected error occurred.'
      });
    }

    const dataObj = JSON.parse(data);
    const dataNotes = dataObj.notes;

    dataNotes[dataObj.nextId] = newNote;
    dataNotes[dataObj.nextId].id = dataObj.nextId;
    const answer = dataNotes[dataObj.nextId];
    dataObj.nextId = dataObj.nextId += 1;

    const prettyObj = JSON.stringify(dataObj, null, 2);
    fs.writeFile('./data.json', prettyObj, err => {
      if (err) {
        console.error(err);
        res.status(500);
        res.json({
          error: 'An unexpected error occurred.'
        });
      } else {
        res.status(201);
        res.json(answer);
      }
    });
  });

});

app.delete('/api/notes/:id', (req, res) => {
  const requestedId = req.params.id;
  if (requestedId < 0) {
    res.status(400).json({
      error: 'id must be a positive integer'
    });
    return;
  }
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({
        error: 'An unexpected error occurred.'
      });
    }

    const dataObj = JSON.parse(data);
    const dataNotes = dataObj.notes;

    if (!dataNotes[requestedId]) {
      res.status(404);
      res.json({
        error: `${requestedId} ID  does not exist`
      });
    } else {
      delete dataNotes[requestedId];
      const prettyObj = JSON.stringify(dataObj, null, 2);
      fs.writeFile('./data.json', prettyObj, err => {
        if (err) {
          console.error(err);
          res.status(500);
          res.json({
            error: 'An unexpected error occurred.'
          });
        } else {
          res.sendStatus(204);
        }
      });
    }

  });

});

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');

});
