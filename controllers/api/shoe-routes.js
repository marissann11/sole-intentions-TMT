const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Shoe, User, Cart } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const dbShoeData = await Shoe.findAll({
      attributes: ['id', 'name', 'price', 'picture'],
    });
    res.json(dbShoeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get('/shoe/:id', async (req, res) => {
  try {
    const dbShoeData = await Shoe.findOne({
      where: {
        id: req.params.id,
      },
      attributes: ['id', 'name', 'price', 'picture', 'description'],
    });
    res.json(dbShoeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  if (req.session) {
    try {
      const dbShoeData = await Shoe.create({
        name: req.body.name,
        price: req.body.price,
        description: req.session.description,
      });
      res.json(dbShoeData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const dbShoeData = await Shoe.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.json(dbShoeData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
