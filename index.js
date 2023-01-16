require('dotenv').config();

const express   = require('express');
const mongoose  = require('mongoose');
const app       = express();

const port      = process.env.PORT || 3000;
const dbUri     = process.env.DB_URI;
const dbOptions = {
  dbName: process.env.DB_NAME,
  user: process.env.DB_USER,
  pass: encodeURIComponent(process.env.DB_PASS),
}

const user      = require('./routes/user.routes');
const activity  = require('./routes/activity.routes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(user);
app.use(activity);

try {
  mongoose.set('strictQuery', true);
  mongoose.connect(dbUri, dbOptions);

  console.log('Mongo DB conectado.');

  app.listen(port, () => {
    console.log(`Servidor online - Porta: ${port}`);
  });
} catch(err) {
  console.error(`Erro ao conectar Mongo DB: ${err}`);
}