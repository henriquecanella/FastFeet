import * as Yup from 'yup';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import DeliveryProblem from '../models/DeliveryProblem';

import DeliveryMail from '../jobs/DeliveryMail';
import CancellationMail from '../jobs/CancellationMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, product, deliveryman_id } = req.body;

    const deliveryExists = await Delivery.findOne({
      where: { product, recipient_id, canceled_at: null },
    });

    if (deliveryExists) {
      return res
        .status(400)
        .json({ error: 'A delivery was already created for this package' });
    }

    const delivery = await Delivery.create({
      recipient_id,
      product,
      deliveryman_id,
    });

    const deliverymail = await Delivery.findByPk(delivery.id, {
      include: [
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['name', 'email'],
        },
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['name', 'street', 'number', 'complement', 'cep'],
        },
      ],
    });

    await Queue.add(DeliveryMail.key, {
      deliverymail,
    });

    return res.json(delivery);
  }

  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: { canceled_at: null },
      order: ['created_at'],
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'start_date',
        'end_date',
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    const { recipient_id, product } = req.body;

    if (
      recipient_id !== delivery.recipient_id &&
      product !== delivery.product
    ) {
      const deliveryExists = await Delivery.findOne({
        where: { product, recipient_id, canceled_at: null },
      });

      if (deliveryExists) {
        return res
          .status(400)
          .json({ error: 'A delivery was already created for this package' });
      }
    }

    const { deliveryman_id } = await delivery.update(req.body);

    return res.json({ recipient_id, product, deliveryman_id });
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

export default new DeliveryController();
