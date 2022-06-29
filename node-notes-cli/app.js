
const fs = require('fs');

const answer = process.argv[2];
const input = process.argv[3];
console.log('wat is going on +*-/', answer);

if (answer === 'read') {

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    const dataNotes = dataObj.notes;

    for (const property in dataNotes) {
      console.log(`${property}: ${dataNotes[property]}`);
    }
  });
}

if (answer === 'create') {

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);

    let currentId = dataObj.nextId;
    dataObj.notes[currentId] = input;
    currentId++;
    dataObj.nextId = currentId;
    const prettyObj = JSON.stringify(dataObj, null, 2);

    fs.writeFile('data.json', prettyObj, err => {
      if (err) throw err;
    });
  });
}

if (answer === 'delete') {

  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const dataObj = JSON.parse(data);
    delete dataObj.notes[input];
    const prettyObj = JSON.stringify(dataObj, null, 2);

    fs.writeFile('data.json', prettyObj, err => {
      if (err) throw err;
    });
  });
}
