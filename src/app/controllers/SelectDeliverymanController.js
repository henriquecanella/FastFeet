import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class SelectDeliverymanController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'avatar_id', 'created_at'],
      include: [
        {
          model: File,
          as: 'avatar',
          attributes: ['name', 'path', 'url'],
        },
      ],
    });

    return res.json(deliveryman);
  }
}

export default new SelectDeliverymanController();
