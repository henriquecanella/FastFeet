import * as Yup from 'yup';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

import DeliveryMail from '../jobs/DeliveryMail';
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
    const { q } = req.query;

    const deliveries = await Delivery.findAll({
      where: {
        product: {
          [Op.iLike]: `%${q}%`,
        },
      },
      order: ['created_at'],
      attributes: [
        'id',
        'signature_id',
        'product',
        'start_date',
        'end_date',
        'canceled_at',
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'city',
            'state',
            'street',
            'number',
            'complement',
            'cep',
          ],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['id', 'name', 'path', 'url'],
        },
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
    /* const delivery = await Delivery.findByPk(req.params.id, {
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

    return res.json(delivery); */
    const delivery = await Delivery.findByPk(req.params.id);

    await delivery.destroy();

    return res.json({ name: `Delivery ${delivery.id} deleted` });
  }
}

export default new DeliveryController();
