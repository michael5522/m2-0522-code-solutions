const express = require('express');
/* eslint-disable no-console */
const app = express();
app.use((req, res) => {
  console.log(req.method);
  res.send('ola');
});

app.listen(3000, () => {
  console.log('3000');
});
