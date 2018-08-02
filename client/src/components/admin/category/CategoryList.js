import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CategoryItem from './CategoryItem';
import Spinner from '../../../common/Spinner';

import {
  getCategories,
  removeCategory
} from '../../../actions/categoryActions';

class CategoryList extends Component {
  state = {
    show: false
  };
  async componentDidMount() {
    await this.props.getCategories();
    this.setState({ show: true });
  }
  handleDelete = id => {
    // confirmation
    this.props.removeCategory(id);
  };
  render() {
    const { categories } = this.props;
    return (
      <Fragment>
        {!this.state.show && categories.length === 0 && <Spinner />}
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
      </Fragment>
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
