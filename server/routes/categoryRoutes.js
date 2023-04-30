const express = require('express');
const Category = require('../models/categoryModel');

const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
  const categoryList = await Category.find();

  if (categoryList) {
    return res.status(200).send(categoryList);
  } else {
    return res.status(500).json({ succes: false });
  }
});

categoryRouter.get('/:id', async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    return res.status(200).send(category);
  } else {
    return res
      .status(500)
      .json({ message: 'The category with the given ID was not found' });
  }
});

categoryRouter.post('/', async (req, res) => {
  let category = new Category({
    name: req.body.name,
    quantityavailable: req.body.quantityavailable,
    quantitysold: req.body.quantitysold,
    ordersinqueue: req.body.ordersinqueue,
  });

  if (category) {
    category = await category.save();
  } else {
    return res.status(400).send({ message: 'The category cannot be created' });
  }

  res.send(category);
});

categoryRouter.put('/:id', async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    { new: true }
  );

  if (!category) return res.status(400).send('The category cannot be updated');

  res.send(category);
});

categoryRouter.delete('/:id', (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: 'Category is deleted' });
      } else {
        return res
          .status(404)
          .json({ success: false, message: 'Category not found!' });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = categoryRouter;
