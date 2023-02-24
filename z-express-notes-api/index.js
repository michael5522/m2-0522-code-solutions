const express = require('express');
const app = express();
const fs = require('fs');
const middleWare = express.json();
app.use(middleWare);
/* eslint-disable no-console */
app.get('/api/notes', (req, res) => {
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const notes = parsedData.notes;
    // console.log(notes);
    const array = [];
    for (const property in notes) {
      // console.log(`${property}: ${notes[property]}`);
      array.push(notes[property]);
    }
    console.log('xxx', array);
    res.status(200).json(array);
  });
});

app.get('/api/notes/:id', (req, res) => {
  const match = parseInt(req.params.id);
  // console.log(typeof req.params.id);
  if (match < 0) {
    res.status(400).json({
      error: 'must be pos or int'
    });
  }
  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const notes = parsedData.notes;
    console.log(notes);
    const answer = notes[match];
    if (!notes[match]) {
      res.status(404).json({
        error: `no ${match} in here`
      });
      return;
    }
    res.status(200).json(
      answer
    );
  });
});

app.post('/api/notes', (req, res) => {
  const answer = req.body.content;
  if (!answer) {
    res.status(400).json({
      error: 'need content'
    });
    return;
  }

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const notes = parsedData.notes;
    // console.log(notes);
    notes[parsedData.nextId] = req.body;
    notes[parsedData.nextId].id = parsedData.nextId;
    const ggg = notes[parsedData.nextId];
    parsedData.nextId++;
    console.log(parsedData);

    const prettyObj = JSON.stringify(parsedData, null, 2);

    fs.writeFile('data.json', prettyObj, err => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: 'an unexpected error occured'
        });
      } else {
        res.status(201).json(ggg);
      }

    });
  });

});

app.delete('/api/notes/:id', (req, res) => {

  const item = parseInt(req.params.id);
  if (item <= 0) {
    res.status(400).json({
      error: 'must be a postive int'
    });
    return;
  }

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const notes = parsedData.notes;
    // console.log(notes);

    if (!notes[item]) {
      res.status(404).json({
        error: `${item} no exist`
      });
      return;
    }

    delete notes[item];
    console.log(notes);
    const prettyObj = JSON.stringify(parsedData, null, 2);

    fs.writeFile('data.json', prettyObj, err => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: 'unexpected error occured'
        });
      } else {
        res.sendStatus(204);
      }
    });
  });
});

app.put('/api/notes/:id', (req, res) => {
  const gg = parseInt(req.params.id);
  console.log(gg);
  // console.log(req.body);
  if (gg <= 0 || !req.body.content) {
    res.status(400).json({
      error: 'no valid id or no content'
    });
  }

  fs.readFile('data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const parsedData = JSON.parse(data);
    const notes = parsedData.notes;
    console.log(notes);
    if (!notes[gg]) {
      res.status(404).json({
        error: `${gg} no exist`
      });
      return;
    }

    notes[gg].content = req.body.content;

    const abc = notes[gg];
    // console.log(notes);
    const prettyObj = JSON.stringify(parsedData, null, 2);
    fs.writeFile('data.json', prettyObj, err => {
      if (err) {
        res.status(500).json({
          error: 'an unexpected error'
        });
      } else {
        res.status(200).json(
          abc
        );
      }
    });
  });
});

app.listen(3000, () => {
  console.log('listening@3000');
});
