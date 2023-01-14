const Person  = require('../models/Person');

class PersonController {

  async create(request, response) {
    try {
      const { name, email, salary, approved } = request.body;
      const personData = {
        name,
        email,
        salary,
        approved
      };

      const emailExists = await Person.findOne({ email });

      if (emailExists) {
        return response.status(422).json({ error: "Email já em uso" });
      }

      await Person.create(personData);
      
      return response.status(201).json({ message: `${personData.name} criado com sucesso.` });
    } catch (error) {
      return response.status(500).json({
         error: error.message
      });
    }
  }

  async read(request, response) {
    try {
      const id = request.params.id;

      if (id) {
        const person = await Person.findOne({ _id: id });

        if (!person) {
          return response.status(422).json({ message: 'Usuário não encontrado' });
        }
        return response.status(200).json(person);
      } else {
          const people = await Person.find();

          return response.status(200).json(people);
      }
    } catch (error) {
      return response.status(500).json({
        error: error.message
      });
    }
  }
}

module.exports = new PersonController();