import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ReactS3 from 'react-s3';
import ReactS3 from '../../../common/react-s3';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Dashboard from '../dashboard/Dashboard';
import InputItem from '../../../common/InputItem';
import SelectItem from '../../../common/SelectItem';
import Button from '../../../common/Button';
import BackImage from '../images/back.png';

import {
  addProduct,
  editProduct,
  getProduct
} from '../../../actions/productActions';

import { getCategories } from '../../../actions/categoryActions';

import './Product.css';

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME.replace("'", ''),
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID.replace("'", ''),
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY.replace("'", '')
};

class ProductInput extends Component {
  state = {
    category: '',
    name: '',
    image: '',
    imagePath: '',
    errors: {},
    editing: false,
    id: '',
    disabled: true,
    oldImage: '',
    submited: false
  };

  componentDidMount() {
    if (this.props.match.params.id) {
      const { id } = this.props.match.params;
      this.props.getProduct(id);
      this.setState({ editing: true, id });
    }
    this.props.getCategories();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.product && this.state.editing) {
      this.setState({
        category: nextProps.product.category,
        name: nextProps.product.name,
        imagePath: nextProps.product.image,
        oldImage: nextProps.product.image,
        disabled: false
      });
    }
  }

  async componentWillUnmount() {
    // CASE 1
    // action = (ADD)
    // (CONFIRM) was not clicked
    // (IMAGE) was loaded
    if (!this.state.editing && !this.state.submited && this.state.image) {
      return this.onDelete(this.state.imagePath);
    }

    // CASE 2
    // action = (EDIT)
    // (CONFIRM) was not clicked
    // another (IMAGE) was loaded
    if (this.state.editing && !this.state.submited && this.state.image) {
      return this.onDelete(this.state.imagePath);
    }

    // CASE 3
    // has an oldImage loaded
    // (CONFIRM) was clicked
    // another (IMAGE) was loaded
    if (this.state.oldImage && this.state.submited && this.state.image) {
      return this.onDelete(this.state.oldImage);
    }
  }

  onDelete = async file => {
    try {
      let fileName = file.substr(file.lastIndexOf('/') + 1);
      await ReactS3.deleteFile(fileName, config);
    } catch (err) {
      console.log(err);
    }
  };

  onSubmit = async e => {
    e.preventDefault();

    const product = {
      category: this.state.category,
      name: this.state.name,
      image: this.state.imagePath
    };
    this.setState({ submited: true });
    if (this.state.editing) {
      await this.setState({ editing: false });
      this.props.editProduct(this.state.id, product, this.props.history);
    } else {
      this.props.addProduct(product, this.props.history);
    }
  };

  onChange = e => {
    if (e.target.files) {
      let file = e.target.files[0];
      let extension = file.name.substr(file.name.lastIndexOf('.') + 1);

      this.setState({ disabled: true });
      if (this.validateExtension(extension)) {
        let fileRenamed = new File(
          [file],
          Date.now() + Math.floor(Math.random()) + '.' + extension
        );
        this.onUpload(fileRenamed);
      } else {
        this.setState({
          errors: {
            image:
              'Unknown extension, please select a jpeg, jpg, png or gif image.'
          }
        });
      }
    }
    this.setState({ [e.target.name]: e.target.value });
  };

  onUpload = async file => {
    try {
      const data = await ReactS3.uploadFile(file, config);
      this.setState({ imagePath: data.location, disabled: false });
    } catch (err) {
      this.setState({
        errors: {
          image: 'Impossible to upload the image file.'
        }
      });
    }
  };

  validateExtension = extension => {
    return (
      extension.endsWith('jpeg') ||
      extension.endsWith('jpg') ||
      extension.endsWith('png') ||
      extension.endsWith('gif') ||
      extension.endsWith('svg') ||
      extension.endsWith('JPEG') ||
      extension.endsWith('PNG') ||
      extension.endsWith('JPG') ||
      extension.endsWith('GIF') ||
      extension.endsWith('SVG')
    );
  };

  render() {
    const { errors, disabled } = this.state;
    return (
      <Dashboard title="Product" componentClass="product-admin">
        <Link to="/admin/products" className="product-admin__back">
          <img
            src={BackImage}
            alt="Go back Icon"
            className="product-admin__icon"
          />
          <span>Back</span>
        </Link>
        <form onSubmit={this.onSubmit} className="product-admin__form">
          <InputItem
            label="name"
            name="name"
            value={this.state.name}
            onChange={this.onChange}
            error={errors.name}
          />

          <div className="product-admin__form-group">
            <SelectItem
              label="category"
              name="category"
              value={this.state.category}
              onChange={this.onChange}
              error={errors.category}
              categories={this.props.categories}
              message="Select Category"
            />

            <InputItem
              label="image"
              name="image"
              type="file"
              value={this.state.image}
              onChange={this.onChange}
              error={errors.image}
            />
          </div>
          {(this.state.editing || this.state.imagePath) && (
            <img
              src={this.state.imagePath}
              alt="Product"
              className="product-admin__image"
            />
          )}
          <Button
            type="submit"
            text="Confirm"
            desc="confirm"
            disabled={disabled}
          />
        </form>
      </Dashboard>
    );
  }
}

ProductInput.propTypes = {
  addProduct: PropTypes.func.isRequired,
  editProduct: PropTypes.func.isRequired,
  getProduct: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  let categories = state.category.categories;
  categories.sort((a, b) => {
    return a.name.toUpperCase() > b.name.toUpperCase();
  });
  return {
    categories,
    errors: state.errors,
    product: state.product.product
  };
};

export default connect(
  mapStateToProps,
  { addProduct, editProduct, getProduct, getCategories }
)(withRouter(ProductInput));
