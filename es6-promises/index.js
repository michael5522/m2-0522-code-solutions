const takeAChance = require('./take-a-chance');

const answer = takeAChance('michael');
answer.then(value => {
  console.log(value);
});
answer.catch(error => {
  console.error(error.message);
});
