require('dotenv').config();

console.log(process.env.DB_USER);

const DB_USER   = process.env.DB_USER;
const DB_PASS   = encodeURIComponent(process.env.DB_PASS);
const DB_URI    = `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.6bv7yuw.mongodb.net/bancodedados?retryWrites=true&w=majority`;
const PORT      = 3000;

const express   = require('express');
const mongoose  = require('mongoose');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const personRoutes = require('./routes/person.routes');

app.use('/person', personRoutes);

mongoose.connect(DB_URI)
  .then(() => {

    console.log('Mongo DB conectado.');

    app.listen(PORT, () => {
      console.log(`Servidor online - Porta: ${PORT}`);
    });

  })
  .catch((err) => {

    console.log(`Erro ao conectar Mongo DB: ${err}`);

  })