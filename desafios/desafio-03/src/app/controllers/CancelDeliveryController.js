import Delivery from '../models/Delivery';

import Queue from '../../lib/Queue';
import DeliveryProblem from '../models/DeliveryProblem';
import Recipient from '../models/Recipient';

import CancellationMail from '../jobs/CancellationMail';
import Deliveryman from '../models/Deliveryman';

class CancelDeliveryController {
  async delete(req, res) {
    const delivery_problem_id = req.params.id;
    const delivery_problem = await DeliveryProblem.findByPk(
      delivery_problem_id
    );

    if (!delivery_problem) {
      return res.status(404).json({ error: 'Delivery problem not found' });
    }

    const delivery = await Delivery.findByPk(delivery_problem.delivery_id, {
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: ['id', 'name'],
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'email', 'name'],
        },
      ],
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    delivery.canceled_at = new Date();

    const data = await delivery.save();

    await Queue.add(CancellationMail.key, {
      delivery,
    });

    return res.json(data);
  }
}

export default new CancelDeliveryController();
