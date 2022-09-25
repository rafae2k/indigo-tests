const express = require('express');
const cors = require('cors');
const { heroesRouter } = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(heroesRouter);

app.listen(PORT, () => {
  console.log(`app listening at ${PORT}`);
});
