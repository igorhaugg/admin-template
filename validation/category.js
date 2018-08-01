const Validator = require('validator');
const isEmpty = require('./_check-string');

module.exports = function validateCategoryInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    validation: isEmpty(errors)
  };
};
