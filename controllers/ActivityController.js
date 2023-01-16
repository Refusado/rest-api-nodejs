const Activity  = require('../models/Activity');

class ActivityController {

  async create(request, response) {
    try {
      const { name, description, craetedBy } = request.body;
      const activityData = {
        name,
        description,
        craetedBy,
      };

      await Activity.create(activityData);
      
      return response.status(201).json({ message: `${activityData.name} criado com sucesso.` });
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async read(request, response) {
    try {
      const id = request.params.id;

      if (id) {
        const activity = await Activity.findOne({ _id: id });
        if (activity) {
          return response.status(200).json(activity);
        }
        
        return response.status(422).json({ message: `ID '${id}' não encontrado` });
      } else {
          const activities = await Activity.find();

          return response.status(200).json(activities);
      }
    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async update(request, response) {
    try {
      const id = request.params.id;
      const { name, description, craetedBy } = request.body;
      const activityData = {
        name,
        description,
        craetedBy,
      };

      const update = await Activity.updateOne( {_id: id }, activityData);

      if (update.matchedCount) {
        const updatedActivity = await Activity.findOne({ _id: id });
        return response.status(200).json({ updated: updatedActivity });
      }
        
      return response.status(422).json({ message: 'Atualização malsucedida' });

    } catch (error) {
      return response.status(500).json({ error: error.message });
    }
  }

  async delete(request, response) {
    const id = request.params.id;
    const activity = await Activity.findOne({ _id: id });

    if (activity) {
      try {
        const deleted = await Activity.deleteOne({ _id: id });
        if (deleted.deletedCount) {
          response.status(200).json({ deleted: activity });
        }
      } catch (error) {
        response.status(500).json({ message: error.message });
      }
    } else {
      return response.status(422).json({ message: `ID ${id} não encontrado` });
    }
  }
}

module.exports = new ActivityController();