const User  = require('../models/User');

class UserController {

  async create(request, response) {
    try {
      const { name, email, isEnterprise } = request.body;
      const userData = {
        name,
        email,
        isEnterprise,
      };

      const emailExists = await User.findOne({ email });

      if (emailExists) {
        return response.status(422).json({ error: "Email já em uso" });
      }

      await User.create(userData);
      
      return response.status(201).json({ message: `${userData.name} criado com sucesso.` });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async read(request, response) {
    try {
      const id      = request.params.id;
      const offset  = +request.query.offset || 0;
      const limit   = +request.query.limit || 10;
      const body    = {
        total: 0,
        offset,
        limit,
        data: [],
      }

      if (id) {
        const user  = await User.findOne({ _id: id });
        
        if (user) {
          body.total  = 1;
          body.data   = user;
          return response.status(200).json(body);
        }
        return response.status(422).json({ message: `ID '${id}' não encontrado` });
      } else {
        const total = await User.countDocuments();
        const users = await User.find().limit(limit).skip(offset);
        body.total  = total;
        body.data   = users;

        return response.status(200).json(body);
      }
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const id = request.params.id;
      const { name, email, isEnterprise } = request.body;
      const userData = {
        name,
        email,
        isEnterprise
      };

      const update = await User.updateOne( {_id: id }, userData);

      if (update.matchedCount) {
        const updatedUser = await User.findOne({ _id: id });
        return response.status(200).json({ updated: updatedUser });
      }
        
      return response.status(422).json({ message: 'Atualização malsucedida' });

    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async delete(request, response) {
    const id = request.params.id;
    const user = await User.findOne({ _id: id });

    if (user) {
      try {
        const deleted = await User.deleteOne({ _id: id });
        if (deleted.deletedCount) {
          response.status(200).json({ deleted: user });
        }
      } catch (error) {
        response.status(500).json({ message: error.message });
      }
    } else {
      return response.status(422).json({ message: `ID ${id} não encontrado` });
    }
  }
}

module.exports = new UserController();