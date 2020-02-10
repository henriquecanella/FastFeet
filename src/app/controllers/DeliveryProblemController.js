import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';

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
      attributes: ['id', 'delivery_id', 'description'],
    });

    return res.json(deliveryproblem);
  }
}

export default new DeliveryProblemController();
