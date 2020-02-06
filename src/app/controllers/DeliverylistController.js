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
}

export default new DeliverylistController();
