import Mail from '../../lib/Mail';

class CancellationMail {
  get key() {
    return 'CancellationMail';
  }

  async handle({ data }) {
    const { cancellation, delivery } = data;

    await Mail.sendMail({
      to: `${delivery.deliveryman.name} <${delivery.deliveryman.email}>`,
      subject: 'Entrega Cancelada',
      template: 'cancellation',
      context: {
        deliveryman: delivery.deliveryman.name,
        delivery: delivery.product,
        description: cancellation.description,
      },
    });
  }
}

export default new CancellationMail();
