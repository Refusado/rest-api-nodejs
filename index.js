const express = require('express');
const app = express();
const port = 3000;

// garantir que a API só receba e envie objetos JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// rota http inicial
app.get('/', (req, res) => {
  res.json({ message: 'Olá, mundo!'});
});

// entregr aplicação na porta definida
app.listen(port, () => {
  console.log("Servidor online");
});