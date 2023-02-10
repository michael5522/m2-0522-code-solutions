/* eslint-disable no-console */
const express = require('express');
const app = express();
const fs = require('fs');
const middleWare = express.json();
app.use(middleWare);

app.get('/api/notes', (req, res) => {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const gg = JSON.parse(data);
    const notes = gg.notes;

    const array = [];
    for (const pp in notes) {
      array.push(notes[pp]);
    }
    res.status(200);
    res.json(array);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const numba = parseInt(req.params.id);
  console.log(numba);
  if (numba < 0) {
    res.status(400).json({
      error: 'not a pos numba'
    });
    return;
  }
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    const notes = dataObj.notes;

    for (const property in notes) {
      const singleNoteId = notes[property];
      console.log('xxx', singleNoteId, singleNoteId.id);
      if (singleNoteId.id === numba) {
        res.status(200).json(singleNoteId);
        return;
      }

    }
    res.status(404).json({
      error: `cannot find ${numba}`
    });

  });
});

app.get('/api/test2/:pp', (req, res) => {
  const numba = parseInt(req.params.pp);
  console.log(numba);
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    const notes = dataObj.notes;

    if (numba < 0) {
      res.status(400).json({
        error: 'not a pos numa'
      });
    }
    const arrayNotes = Object.values(notes);

    const answer = arrayNotes.findIndex(gg => gg.id === numba);
    console.log('found the index', answer);
    if (answer === -1) {
      res.status(404).json({
        error: `cannot find ${numba}`
      });
    } else {
      res.status(200).json(arrayNotes[answer]);
    }
  });
});

app.post('/api/notes', (req, res) => {
  if (!req.body.content) {
    return res.status(400).json({
      error: 'need a body'
    });
  }

  fs.readFile('./data2.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500);
      res.json({
        error: 'an unexpected error occured.'
      });
    }

    const dataObj = JSON.parse(data);
    const dataNotes = dataObj.notes;

    dataNotes[dataObj.nextId] = req.body;
    dataNotes[dataObj.nextId].id = dataObj.nextId;
    const answer = dataNotes[dataObj.nextId];
    console.log('answer', answer);
    // dataObj.nextId = dataObj.nextId + 1;
    dataObj.nextId++;
    // console.log('222', dataObj);
    const prettyObj = JSON.stringify(dataObj, null, 2);
    console.log(prettyObj);

    fs.writeFile('./data2.json', prettyObj, err => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: 'an unexpected error occured.'
        });
      } else {
        res.status(201).json(answer);
      }
    });

  });

});

app.post('/api/test2/', (req, res) => {
  fs.readFile('./data2.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    }
    const parseData = JSON.parse(data);
    const input = req.body;

    if (!req.body.content) {
      return res.status(400).json({
        error: 'need a body'
      });
    }

    if (req.body.content) {
      input.id = parseData.nextId;
      parseData.notes[input.id] = input;
      parseData.nextId++;
      console.log(parseData.notes[input.id]);
      const answer = parseData.notes[input.id];
      console.log(parseData);
      const prettyObj = JSON.stringify(parseData, null, 2);
      fs.writeFile('./data2.json', prettyObj, err => {
        if (err) {
          console.error(err);
          res.status(500).json({
            error: 'an unexpected error occured'
          });
        } else {
          res.status(201).json(answer);
        }
      });
    }
  });
});

app.listen('3000', () => {
  console.log('workin brah');
});
