import { Op } from 'sequelize';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';

class EndedDeliveryController {
  async index(req, res) {
    const deliveryman = await Deliveryman.findByPk(req.params.id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const deliveries = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: req.params.id,
        end_date: {
          [Op.ne]: null,
        },
      },
    });

    return res.json(deliveries);
  }
}

export default new EndedDeliveryController();
