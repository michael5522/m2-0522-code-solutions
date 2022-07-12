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

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('Express server listening on port 3000');

});
