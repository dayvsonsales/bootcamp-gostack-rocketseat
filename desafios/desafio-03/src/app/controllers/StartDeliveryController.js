import * as yup from 'yup';
import { startOfDay, endOfDay, getHours, getMinutes } from 'date-fns';
import { Op } from 'sequelize';
import Delivery from '../models/Delivery';

class StartDeliveryController {
  async store(req, res) {
    const schema = yup.object().shape({
      deliveryman_id: yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation failed' });
    }

    const { deliveryman_id: id } = req.body;
    const delivery_id = req.params.id;
    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const countDeliveriesToday = await Delivery.findAndCountAll({
      where: {
        deliveryman_id: id,
        start_date: {
          [Op.between]: [startOfDay(new Date()), endOfDay(new Date())],
        },
      },
    });

    if (countDeliveriesToday.count > 5) {
      return res
        .status(400)
        .json({ error: 'You have reached your delivery daily limit' });
    }

    const date = new Date();

    if (getHours(date) >= 8 && getHours(date) <= 18) {
      if (getHours(date) === 18 && getMinutes(date) === 0) {
        return res.status(400).json({ error: 'Not allowed' });
      }

      delivery.start_date = new Date();

      const data = await delivery.save();

      return res.json(data);
    }

    return res.status(400).json({ error: 'Not allowed' });
  }
}

export default new StartDeliveryController();
