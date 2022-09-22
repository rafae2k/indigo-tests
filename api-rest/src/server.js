const express = require('express');
const { heroesRouter } = require('./routes');

const app = express();
const port = 3001;

app.use(express.json());
app.use(heroesRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
