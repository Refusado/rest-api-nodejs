const Event  = require('../models/Event');

class EventController {

  async create(request, response) {
    try {
      const { name, description, byUser } = request.body;
      const eventData = {
        name,
        description,
        byUser,
      };

      await Event.create(eventData);
      
      return response.status(201).json({ message: `${eventData.name} criado com sucesso.` });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async read(request, response) {
    try {
      const id = request.params.id;

      if (id) {
        const event = await Event.findOne({ _id: id });
        if (event) {
          return response.status(200).json(event);
        }
        
        return response.status(422).json({ message: `ID '${id}' não encontrado` });
      } else {
          const events = await Event.find();

          return response.status(200).json(events);
      }
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const { name, description, byUser } = request.body;
      if (!name & !description & !byUser) {
        return response.status(422).json({ message: `Nenhuma chave existente foi enviada` });
      }

      const id = request.params.id;
      const currentData = await Event.findOne({ _id: id });
      if (!currentData) {
        return response.status(422).json({ message: `ID '${id}' não encontrado` });
      }

      const newEventData = {
        name,
        description,
        byUser,
      };
      const update = await Event.updateOne( {_id: id }, newEventData, { runValidators: true });
      if (update.matchedCount) {
        const updatedEvent = await Event.findOne({ _id: id });
        return response.status(200).json({ updated: updatedEvent });
      }
        
      return response.status(422).json({ message: 'Atualização malsucedida' });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async delete(request, response) {
    const id = request.params.id;
    const event = await Event.findOne({ _id: id });

    if (event) {
      try {
        const deleted = await Event.deleteOne({ _id: id });
        if (deleted.deletedCount) {
          response.status(200).json({ deleted: event });
        }
      } catch (error) {
        response.status(500).json({ message: error.message });
      }
    } else {
      return response.status(422).json({ message: `ID ${id} não encontrado` });
    }
  }
}

module.exports = new EventController();