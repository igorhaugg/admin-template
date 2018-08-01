import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import Dashboard from '../dashboard/Dashboard';
import InputItem from '../../../common/InputItem';
import Button from '../../../common/Button';
import BackImage from '../images/back.png';

import {
  addCategory,
  editCategory,
  getCategory
} from '../../../actions/categoryActions';

import './Category.css';

class CategoryInput extends Component {
  state = {
    name: '',
    errors: {},
    editing: false,
    id: ''
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.getCategory(id);
      this.setState({ editing: true, id });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.category && this.state.editing) {
      this.setState({ name: nextProps.category.name });
    }
  }

  onSubmit = async e => {
    e.preventDefault();

    const category = {
      name: this.state.name
    };

    if (this.state.editing) {
      await this.setState({ editing: false });
      this.props.editCategory(this.state.id, category, this.props.history);
    } else {
      this.props.addCategory(category, this.props.history);
    }
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <Dashboard title="Category" componentClass="category-admin">
        <Link to="/admin/categories" className="category-admin__back">
          <img
            src={BackImage}
            alt="Go back Icon"
            className="category-admin__icon"
          />
          <span>Back</span>
        </Link>
        <form onSubmit={this.onSubmit} className="category-admin__form">
          <InputItem
            label="name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />
          <Button type="submit" text="Confirm" desc="confirm" />
        </form>
      </Dashboard>
    );
  }
}

CategoryInput.propTypes = {
  addCategory: PropTypes.func.isRequired,
  editCategory: PropTypes.func.isRequired,
  getCategory: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  category: state.category.category
});

export default connect(
  mapStateToProps,
  { addCategory, editCategory, getCategory }
)(withRouter(CategoryInput));
