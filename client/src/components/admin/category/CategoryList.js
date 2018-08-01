import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import CategoryItem from './CategoryItem';

import {
  getCategories,
  removeCategory
} from '../../../actions/categoryActions';

class CategoryList extends Component {
  componentDidMount() {
    this.props.getCategories();
  }
  handleDelete = id => {
    // confirmation
    this.props.removeCategory(id);
  };
  render() {
    const { categories } = this.props;
    return (
      <ul className="category-admin__list">
        {categories.map(category => {
          return (
            <CategoryItem
              key={category._id}
              {...category}
              onDelete={this.handleDelete}
            />
          );
        })}
      </ul>
    );
  }
}

CategoryList.propTypes = {
  getCategories: PropTypes.func.isRequired,
  removeCategory: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

const mapStateToProps = state => {
  let categories = state.category.categories;
  categories.sort((a, b) => {
    return a.name.toUpperCase() > b.name.toUpperCase();
  });
  return {
    categories
  };
};

export default connect(
  mapStateToProps,
  { getCategories, removeCategory }
)(CategoryList);
