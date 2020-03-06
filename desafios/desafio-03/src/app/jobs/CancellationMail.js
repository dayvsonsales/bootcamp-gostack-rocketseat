import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Sua entrega foi cancelada',
      template: 'cancellation',
      context: {
        user: delivery.deliveryman.name,
        delivery_id: delivery.id,
      },
    });
  }
}

export default new CancellationMail();
