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
}

export default new DeliveryController();
