const express = require('express');
const cors = require('cors');
const { heroesRouter } = require('./routes');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());
app.use(heroesRouter);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
