import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const deliveries = await Delivery.findAndCountAll({
      include: [
        {
          model: DeliveryProblem,
          as: 'delivery_problem',
          required: true,
        },
      ],
      offset: page - 1,
      limit: 30,
    });

    return res.json(deliveries);
  }
}

export default new DeliveryProblemController();
