import * as yup from 'yup';

import Delivery from '../models/Delivery';
import DeliveryProblem from '../models/DeliveryProblem';

class ProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const { id } = req.params;

    const deliveries = await DeliveryProblem.findAndCountAll({
      where: {
        delivery_id: id,
      },
      offset: page - 1,
      limit: 30,
    });

    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = yup.object().shape({
      description: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const delivery_id = req.params.id;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'Delivery invalid' });
    }

    if (delivery.end_date) {
      return res.status(400).json({ error: 'Delivery is already finished' });
    }

    req.body.delivery_id = delivery.id;

    console.log(req.body);

    const data = await DeliveryProblem.create(req.body);

    return res.json(data);
  }
}

export default new ProblemController();
