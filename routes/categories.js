const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { ObjectID } = require('mongodb');

const router = express.Router();

const validateCategory = require('../validation/category');
const Category = require('../models/Category');
const Product = require('../models/Product');
const keys = require('../config/keys');

// @route   GET api/categories
// @desc    Get all categories
// @access  Private
router.get(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const errors = {};
    try {
      const categories = await Category.find();
      if (!categories || categories.length === 0) {
        errors.nocategories = 'There are no categories';
        return res.status(404).json(errors);
      }

      res.json(categories);
    } catch (err) {
      res.status(404).json({ nocategories: 'There are no categories' });
    }
  }
);

// @route   POST api/categories
// @desc    Add category
// @access  Private
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    const { errors, validation } = validateCategory(req.body);
    // Check Validation
    if (!validation) {
      return res.status(400).json(errors);
    }
    // Get fields
    const categoryFields = {};
    categoryFields.name = req.body.name;

    try {
      const category = await Category.findOne({ name: req.body.name });
      if (category) {
        let errors = {};
        errors.name = 'A category with this name already exists';
        res.status(400).json(errors);
      } else {
        new Category(categoryFields)
          .save()
          .then(category => res.json(category));
      }
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

// @route   GET api/categories/:id
// @desc    Get category
// @access  Private
router.get(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let errors = {};
    let id = req.params.id;
    let name = req.body.name;

    if (!ObjectID.isValid(id)) {
      errors.id = 'Invalid category ID';
    }

    try {
      const category = await Category.findOne({ _id: id });
      if (!category) {
        errors.nocategory = 'Category not found';
        return res.status(404).json(errors);
      }

      res.json(category);
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

// @route   PATCH api/categories/:id
// @desc    Edit category
// @access  Private
router.patch(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let { errors, validation } = validateCategory(req.body);
    let id = req.params.id;
    let name = req.body.name;

    // Check Validation
    if (!validation) {
      return res.status(400).json(errors);
    }

    if (!ObjectID.isValid(id)) {
      errors.id = 'Invalid ID';
    }

    try {
      const category = await Category.findOneAndUpdate(
        { _id: id },
        { name },
        { new: true }
      );
      if (!category) {
        errors.nocategory = 'Category not found';
        return res.status(404).json(errors);
      }

      res.json(category);
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

// @route   DELETE api/categories/:id
// @desc    Delete category
// @access  Private
router.delete(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  async (req, res) => {
    let id = req.params.id;
    let errors = {};

    if (!ObjectID.isValid(id)) {
      errors.id = 'Invalid ID';
    }

    const hasProducts = await Product.find({ category: id });
    if (!hasProducts || hasProducts.length !== 0) {
      errors.hasproducts =
        'This category has products associated and cannot be deleted';
      return res.status(404).json(errors);
    }

    try {
      const category = await Category.findOneAndRemove({
        _id: id
      });
      if (!category) {
        errors.nocategory = 'Category not found';
        return res.status(404).json(errors);
      }

      res.json(category);
    } catch (e) {
      res.status(400).json(errors);
    }
  }
);

module.exports = router;
