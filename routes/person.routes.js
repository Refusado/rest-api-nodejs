const router  = require('express').Router();
const Person  = require('../models/Person');

router.post("/", async (req, res) => {
  const { name, salary, approved } = req.body;

  if (!name)
    res.status(422).json({ error: "O campo 'nome' está vazio." });
    
  const person = {
    name,
    salary,
    approved
  };  

  try {
    await Person.create(person);
    res.status(201).json({ message: `${person.name} criado com sucesso.` });

  } catch (error) {
    res.status(505).json({ error: error });
  }
});

module.exports = router;