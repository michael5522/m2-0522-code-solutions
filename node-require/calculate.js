const a = require('./add');
const s = require('./subtract');
const m = require('./multiply');
const d = require('./divide');

const first = parseFloat(process.argv[2]);
const second = parseFloat(process.argv[4]);
const star = process.argv[3];

if (star === 'plus') {
  console.log(a.add(first, second));
}

if (star === 'minus') {
  console.log(s.subtract(first, second));
}

if (star === 'over') {
  console.log(d.divide(first, second));
}

if (star === 'time') {
  console.log(m.multiply(first, second));
}
