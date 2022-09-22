const { type } = require('os');
const data = require('../utils/data');

module.exports = {
  getAll: (_req, res) => {
    return res.status(200).json(data);
  },
  getById: (req, res) => {
    const { id } = req.params;

    const hero = data.find((hero) => Number(hero.id) === Number(id));

    if (!hero) {
      return res.status(404).json({ message: 'Hero not found' });
    }

    return res.status(200).json(hero);
  },
  create: (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    const newHero = {
      id: data.length + 1,
      name,
      description,
    };

    const heroAlreadyExists = data.some((hero) => hero.name === name);

    if (heroAlreadyExists) {
      return res.status(409).json({ message: 'Hero already exists.' });
    }

    data.push(newHero);

    return res.status(201).json(newHero);
  },
  update: (req, res) => {
    const { id } = req.params;
    const { name, description } = req.body;

    const heroIndex = data.findIndex((hero) => hero.id === Number(id));

    if (heroIndex === -1) {
      return res.status(404).json({ message: 'Hero not found.' });
    }

    const hero = data[heroIndex];

    const updatedHero = {
      ...hero,
      name,
      description,
    };

    data[heroIndex] = updatedHero;

    return res.status(200).json(updatedHero);
  },
  delete: (req, res) => {
    const { id } = req.params;

    console.log(id);

    if (!id) {
      return res.status(400).json({ message: 'Invalid entries. Try again.' });
    }

    const heroIndex = data.findIndex((hero) => hero.id === Number(id));

    if (heroIndex === -1) {
      return res.status(404).json({ message: 'Hero not found!' });
    }

    data.splice(heroIndex, 1);

    return res.status(204).end();
  },
};
