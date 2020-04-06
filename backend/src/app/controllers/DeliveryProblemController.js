import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const deliveryproblem = await DeliveryProblem.create({
      description: req.body.description,
      delivery_id: req.params.id,
    });

    return res.json(deliveryproblem);
  }

  async index(req, res) {
    const deliveryproblem = await DeliveryProblem.findAll({
      where: { delivery_id: req.params.id },
      attributes: ['id', 'delivery_id', 'description', 'created_at'],
    });

    return res.json(deliveryproblem);
  }

  async delete(req, res) {
    const delivery = await Delivery.findByPk(req.params.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
      ],
    });

    delivery.canceled_at = new Date();

    await delivery.save();

    const cancellation = await DeliveryProblem.findOne({
      where: { delivery_id: delivery.id },
      attributes: ['description'],
    });

    await Queue.add(CancellationMail.key, {
      cancellation,
      delivery,
    });

    return res.json(delivery);
  }
}

export default new DeliveryProblemController();
