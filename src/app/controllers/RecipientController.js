import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipientExists = await Recipient.findOne({
      where: {
        name: req.body.name,
        street: req.body.street,
        number: req.body.number,
        city: req.body.city,
      },
    });

    if (recipientExists) {
      return res.status().json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      CEP,
    } = await Recipient.create(req.body);

    return res.json({ id, name, street, number, complement, state, city, CEP });
  }

  async index(req, res) {
    const { q } = req.query;

    const recipients = await Recipient.findAll({
      where: {
        name: {
          [Op.iLike]: `%${q}%`,
        },
      },
      order: ['created_at'],
      attributes: [
        'id',
        'name',
        'street',
        'number',
        'complement',
        'city',
        'state',
        'cep',
      ],
    });

    return res.json(recipients);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string(),
      city: Yup.string(),
      cep: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.findByPk(req.params.id);

    const { name, street, number, city } = req.body;

    if (
      name &&
      street &&
      number &&
      city &&
      name !== recipient.name &&
      street !== recipient.street &&
      number !== recipient.number &&
      city !== recipient.city
    ) {
      const recipientExists = await Recipient.findOne({
        where: {
          name: req.body.name,
          street: req.body.street,
          number: req.body.number,
          city: req.body.city,
        },
      });

      if (recipientExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    const { id, complement, state, cep } = await recipient.update(req.body);
    return res.json({ id, name, street, number, complement, state, city, cep });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    await recipient.destroy();

    return res.json({ name: `Recipient: ${recipient.name} deleted` });
  }
}

export default new RecipientController();
