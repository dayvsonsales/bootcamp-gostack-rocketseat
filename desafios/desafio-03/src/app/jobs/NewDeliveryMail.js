import Mail from '../../lib/Mail';

class NewDelivery {
  get key() {
    return 'NewDelivery';
  }

  async handle({ data: delivery }) {
    console.log(delivery);
    const { deliveryman, recipient } = delivery;

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Você possui uma nova entrega',
      template: 'newdelivery',
      context: {
        user: deliveryman.name,
        product: delivery.product,
        recipient: recipient.name,
        address: `${recipient.street}, ${recipient.number}. ${recipient.city}/${recipient.state}`,
        delivery_id: delivery.id,
      },
    });
  }
}

export default new NewDelivery();
