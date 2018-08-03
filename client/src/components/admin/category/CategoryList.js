import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import CategoryItem from './CategoryItem';
import Spinner from '../../../common/Spinner';
import '../../../common/Confirmation.css';

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
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="confirmation">
            <h1 className="confirmation__title">Are you sure?</h1>
            <div className="confirmation__group">
              <button className="confirmation__button" onClick={onClose}>
                No
              </button>
              <button
                className="confirmation__button"
                onClick={() => {
                  this.props.removeCategory(id);
                  onClose();
                }}
              >
                Yes, Delete it!
              </button>
            </div>
          </div>
        );
      }
    });
  };
  render() {
    const { categories } = this.props;
    return (
      <Fragment>
        {!this.state.show && categories.length === 0 && <Spinner />}
        <ul className="category-admin__list">
          <ReactCSSTransitionGroup
            transitionName="transition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {categories.map(category => {
              return (
                <CategoryItem
                  key={category._id}
                  {...category}
                  onDelete={this.handleDelete}
                />
              );
            })}
          </ReactCSSTransitionGroup>
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
