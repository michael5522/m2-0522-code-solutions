/* eslint-disable no-console */
const express = require('express');
const app = express();
const fs = require('fs');
const middleWare = express.json();
app.use(middleWare);

// get all notes
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

// get 1 NOTE original
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

// get 1 NOTE GOOD ver
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

// post a note normal
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

// post a note good version
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

app.delete('/api/notes/:id', (req, res) => {
  const numba = parseInt(req.params.id);
  if (numba <= 0) {
    return res.status(400).json({
      error: 'needs to be a postive integer'
    });
  }

  fs.readFile('./data2.json', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    }
    const dataObj = JSON.parse(data);
    const notes = dataObj.notes;

    if (!notes[numba]) {
      res.status(404).json({
        error: `${numba} no exist`
      });
    }
    for (const property in notes) {
      const gg = notes[property];

      if (gg.id === numba) {
        res.sendStatus(204);
        delete notes[numba];
      }
    }
    console.log(notes);
  });
});

app.delete('/api/fml/:id', (req, res) => {
  const mustMatch = parseInt(req.params.id);
  console.log(mustMatch);
  if (mustMatch <= 0) {
    return res.status(400).json({
      error: `${mustMatch} must be a valid id`
    });
  }

  fs.readFile('./data2.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'an unexpedtred error occured'
      });
    }
    const dataObj = JSON.parse(data);
    const notes = dataObj.notes;

    if (!notes[mustMatch]) {
      res.status(404).json({
        error: `valid id but  ${mustMatch} not found`
      });
    } else {
      delete notes[mustMatch];
      console.log(notes);
      const prettyObj = JSON.stringify(dataObj, null, 2);
      fs.writeFile('data2.json', prettyObj, 'utf8', err => {
        if (err) {
          res.status(500).json({
            error: 'an unexpected error occured'
          });
        }
      });
      res.sendStatus(204);

    }

  });
});

app.delete('/api/omg/:ppman', (req, res) => {
  const gg = req.params.ppman;
  console.log(gg);

  fs.readFile('./data2.json', (err, data) => {
    if (err) {
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    }

    const parseData = JSON.parse(data);
    const data2 = parseData.notes;

    if (gg <= 0) {
      res.status(400).json({
        error: `${gg} needs to be a postive intiger`
      });
    }

    if (!data2[gg]) {
      res.status(404).json({
        error: `${gg} is good but not in the list`
      });
    } else {
      delete data2[gg];
      console.log(data2);
      const prettyJson = JSON.stringify(parseData, null, 2);
      fs.writeFile('data2.json', prettyJson, err => {
        if (err) {
          res.status(500).json({
            error: 'an unexpected error'
          });
        } else {
          res.sendStatus(204);
        }
      });
    }

  });
});

app.put('/api/notes/:id', (req, res) => {
  const gg = parseInt(req.params.id);
  const content = req.body.content;
  console.log(gg, content);

  if (gg <= 0 || !content) {
    res.status(400).json({
      error: 'it is not a postive number or does not contain the property content'
    });
  }
  fs.readFile('./data2.json', (err, data) => {
    if (err) {
      res.status(500).json({
        error: 'an unexpected error occured'
      });
    }
    const parseObject = JSON.parse(data);
    const notes = parseObject.notes;
    if (!notes[gg]) {
      res.status(404).json({
        error: ` ${gg} no found`
      });
    }

    for (const property in notes) {
      console.log('xxx', notes[property]);
      const current = notes[property];

      if (current.id === gg) {
        console.log('this shit got matched', current);
        notes[gg].content = content;
        console.log(notes);
        const prettyObj = JSON.stringify(parseObject, null, 2);
        fs.writeFile('./data2.json', prettyObj, err => {
          if (err) {
            res.status(500).json({
              error: 'an unexpected error'
            });
          }
          res.status(200).json(current);
        });

      }

    }

  });

});

app.put('/alfredo/:chicken123', (req, res) => {
  const abcd = req.body;
  const rparameter = parseInt(req.params.chicken123);
  // console.log(rparameter);
  // console.log('req body', abcd);

  if (rparameter <= 0) {
    return res.status(400).json({
      error: 'need to be pos int'
    });
  }
  if (!abcd.content) {
    return res.status(400).json({
      error: 'need to have content'
    });
  }

  fs.readFile('./data2.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: 'unexpected error'
      });
    }

    const parsedData = JSON.parse(data);
    const notes = parsedData.notes;
    // console.log(notes);

    if (!notes[rparameter]) {
      return res.status(404).json({
        error: `valid ${rparameter} but not here`
      });
    }

    const answer = notes[rparameter];
    console.log('xxx', answer);
    notes[rparameter].content = abcd.content;
    console.log(notes);

    const prettyObj = JSON.stringify(parsedData, null, 2);
    fs.writeFile('./data2.json', prettyObj, err => {
      if (err) {
        console.error(err);
        res.status(500).json({
          error: 'unexpected error'
        });
      }
      res.status(200).json({
        answer
      });
    });
  });
});

app.listen('3000', () => {
  console.log('workin brah');
});
