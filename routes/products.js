const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { ObjectID } = require('mongodb');

const router = express.Router();

const validateProduct = require('../validation/product');

const Product = require('../models/Product');
const keys = require('../config/keys');

// @route   GET api/products
// @desc    Get all products
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const products = await Product.find();
      if (!products || products.length === 0) {
        errors.noproducts = 'There are no products';
        return res.status(404).json(errors);
      }

      res.json(products);
    } catch (err) {
      res.status(404).json({ noproducts: 'There are no products' });
    }
  }
);

// @route   POST api/products
// @desc    Add product
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, validation } = validateProduct(req.body);
    // Check Validation
    if (!validation) {
      return res.status(400).json(errors);
    }
    // Get fields
    const productFields = {};
    productFields.category = req.body.category;
    productFields.name = req.body.name;
    productFields.image = req.body.image;

    try {
      const product = await Product.findOne({ name: req.body.name });
      if (product) {
        let errors = {};
        errors.name = 'A product with this name already exists';
        res.status(400).json(errors);
      } else {
        new Product(productFields).save().then(product => res.json(product));
      }
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

// @route   GET api/products/:id
// @desc    Get product
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let errors = {};
    let id = req.params.id;
    let name = req.body.name;

    if (!ObjectID.isValid(id)) {
      errors.id = 'Invalid product ID';
    }

    try {
      const product = await Product.findOne({ _id: id });
      if (!product) {
        errors.noproduct = 'Product not found';
        return res.status(404).json(errors);
      }

      res.json(product);
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

// @route   PATCH api/products/:id
// @desc    Edit product
// @access  Private
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let { errors, validation } = validateProduct(req.body);
    let id = req.params.id;
    let category = req.body.category;
    let name = req.body.name;
    let image = req.body.image;

    // Check Validation
    if (!validation) {
      return res.status(400).json(errors);
    }

    if (!ObjectID.isValid(id)) {
      errors.id = 'Invalid product ID';
    }

    try {
      const product = await Product.findOneAndUpdate(
        { _id: id },
        { category, name, image },
        { new: true }
      );
      if (!product) {
        errors.noproduct = 'Product not found';
        return res.status(404).json(errors);
      }

      res.json(product);
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

// @route   DELETE api/products/:id
// @desc    Delete product
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let id = req.params.id;
    let errors = {};

    if (!ObjectID.isValid(id)) {
      errors.id = 'Invalid product ID';
    }

    try {
      const product = await Product.findOneAndRemove({
        _id: id
      });
      if (!product) {
        errors.noproduct = 'Product not found';
        return res.status(404).json(errors);
      }

      res.json(product);
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

module.exports = router;
