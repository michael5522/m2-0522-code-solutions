const fs = require('fs');
const answer = process.argv[2];
console.log(answer);
fs.readFile(answer, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
