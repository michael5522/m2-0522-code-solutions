
const fs = require('fs');

const answer = process.argv[2];
console.log('wat is going on ', answer);
if (answer === 'read') {
  fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) throw err;
    const gg = JSON.parse(data);
    const gg2 = gg.notes;
    for (const property in gg2) {
      console.log(`${property}: ${gg2[property]}`);
    }
  });

}
