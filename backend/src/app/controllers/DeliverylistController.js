import * as Yup from 'yup';
import { Op } from 'sequelize';
import { isAfter, isBefore, setHours, setMinutes, setSeconds } from 'date-fns';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';
import File from '../models/File';

class DeliverylistController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
      where: {
        canceled_at: null,
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
      end_date: Yup.date(),
      signature_id: Yup.number().when('end_date', (end_date, field) =>
        end_date ? field.required() : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.findByPk(req.params.id);

    if (delivery.start_date !== null) {
      await delivery.update({
        end_date: new Date(),
        signature_id: req.body.signature_id,
      });
    } else if (!delivery.start_date && req.body.signature_id) {
      return res.status(400).json({
        error: "You cannot finish a delivery that doesn't started yet",
      });
    }

    delivery.start_date = delivery.start_date
      ? delivery.start_date
      : new Date();

    console.log(delivery.start_date);

    const startDay = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const endDay = setSeconds(setMinutes(setHours(new Date(), 18), 0), 0);

    if (
      isBefore(delivery.start_date, startDay) ||
      isAfter(delivery.start_date, endDay)
    ) {
      return res.status(400).json({ error: 'Invalid time' });
    }

    const { count } = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: req.params.deliveryman,
        start_date: {
          [Op.between]: [startDay, endDay],
        },
      },
    });

    if (count >= 5 && !delivery.end_date) {
      return res
        .status(400)
        .json({ error: 'You cannot take more than 5 deliveries a day' });
    }

    console.log(count);

    await delivery.save();

    return res.json(delivery);
  }
}

export default new DeliverylistController();
