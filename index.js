require('dotenv').config();

const DB_NAME   = process.env.DB_NAME;
const DB_USER   = process.env.DB_USER;
const DB_PASS   = encodeURIComponent(process.env.DB_PASS);
const DB_URI    = `mongodb+srv://${DB_USER}:${DB_PASS}@apicluster.6bv7yuw.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;
const PORT      = process.env.PORT || 3000;

const express   = require('express');
const mongoose  = require('mongoose');

const app = express();
const routes = require('./routes/person.routes');

main();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.get('/', (req, res) => {
  res.json({ message: 'API conectada' });
});

async function main() {
  try {
    await mongoose.connect(DB_URI);

    console.log('Mongo DB conectado.');

    app.listen(PORT, () => {
      console.log(`Servidor online - Porta: ${PORT}`);
    });
  } catch(err) {
    console.error(`Erro ao conectar Mongo DB: ${err}`);
  }
}