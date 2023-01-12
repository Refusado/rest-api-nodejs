const Person  = require('../models/Person');

class PersonController {
  async create(request, response) {
    const { name, email, salary, approved } = request.body;
    const personData = {
      name,
      email,
      salary,
      approved
    };

    try {
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
}

module.exports = new PersonController();