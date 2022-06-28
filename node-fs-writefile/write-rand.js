const fs = require('fs');

const random = `${Math.random().toString()}`;
const data = random + '\n';

fs.writeFile('random.txt', data, 'utf8', err => {
  if (err) throw err;
});
