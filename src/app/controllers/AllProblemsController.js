import DeliveryProblem from '../models/DeliveryProblem';

class AllProblemsController {
  async index(req, res) {
    const deliveryproblem = await DeliveryProblem.findAll({
      attributes: ['id', 'delivery_id', 'description'],
    });

    return res.json(deliveryproblem);
  }
}

export default new AllProblemsController();
