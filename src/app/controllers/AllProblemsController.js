import DeliveryProblem from '../models/DeliveryProblem';

class AllProblemsController {
  async index(req, res) {
    const { page } = req.query;

    if (page) {
      const deliveryproblem = await DeliveryProblem.findAll({
        attributes: ['id', 'delivery_id', 'description'],
        limit: 6,
        offset: (page - 1) * 6,
      });

      return res.json(deliveryproblem);
    }
    const deliveryproblem = await DeliveryProblem.findAll({
      attributes: ['id', 'delivery_id', 'description'],
      order: ['created_at'],
    });

    return res.json(deliveryproblem);
  }
}

export default new AllProblemsController();
