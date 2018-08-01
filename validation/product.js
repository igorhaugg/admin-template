const Validator = require('validator');
const isEmpty = require('./_check-string');
const { ObjectID } = require('mongodb');

module.exports = function validateProductInput(data) {
  let errors = {};

  data.category = !isEmpty(data.category) ? data.category : '';
  data.name = !isEmpty(data.name) ? data.name : '';
  data.image = !isEmpty(data.image) ? data.image : '';

  if (!ObjectID.isValid(data.category)) {
    errors.category = 'Invalid category';
  }

  if (Validator.isEmpty(data.category)) {
    errors.category = 'Category field is required';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  if (Validator.isEmpty(data.image)) {
    errors.image = 'Image field is required';
  }
  return {
    errors,
    validation: isEmpty(errors)
  };
};
