import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliverylistController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        canceled_at: null,
        end_date: null,
        deliveryman_id: req.params.id,
      },
      order: ['created_at'],
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'start_date',
      ],
    });

    return res.json(deliveries);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      end_date: Yup.date(),
      signature_id: Yup.number().when('end_date', (end_date, field) =>
        end_date ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    delivery.start_date = delivery.start_date
      ? delivery.start_date
      : new Date();

    await delivery.save();

    await delivery.update({
      end_date: req.body.end_date,
      signature_id: req.body.signature_id,
    });

    return res.json(delivery);
  }
}

export default new DeliverylistController();
