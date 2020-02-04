import * as Yup from 'yup';
import Delivery from '../models/Delivery';

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
}

export default new DeliveryController();
