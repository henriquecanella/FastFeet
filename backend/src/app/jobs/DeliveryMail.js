import Mail from '../../lib/Mail';

class DeliveryMail {
  get key() {
    return 'DeliveryMail';
  }

  async handle({ data }) {
    const { deliverymail } = data;

    await Mail.sendMail({
      to: `${deliverymail.deliveryman.name} <${deliverymail.deliveryman.email}>`,
      subject: 'Nova Entrega',
      template: 'delivery',
      context: {
        deliveryman: deliverymail.deliveryman.name,
        product: deliverymail.product,
        recipient: `Nome: ${deliverymail.recipient.name},
        Rua: ${deliverymail.recipient.street} ${
          deliverymail.recipient.number
        }, Complemento: ${
          deliverymail.recipient.complement
            ? deliverymail.recipient.complement
            : 'Não Possui'
        }, CEP: ${deliverymail.recipient.cep} `,
      },
    });
  }
}

export default new DeliveryMail();
