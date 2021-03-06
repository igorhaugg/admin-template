import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactS3 from '../../../common/react-s3';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { connect } from 'react-redux';
import { confirmAlert } from 'react-confirm-alert';

import ProductItem from './ProductItem';
import Spinner from '../../../common/Spinner';
import '../../../common/Confirmation.css';

import { getProducts, removeProduct } from '../../../actions/productActions';

const config = {
  bucketName: process.env.REACT_APP_BUCKET_NAME.replace("'", ''),
  region: 'us-east-2',
  accessKeyId: process.env.REACT_APP_ACCESS_KEY_ID.replace("'", ''),
  secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY.replace("'", '')
};

class ProductList extends Component {
  state = {
    show: false
  };
  async componentDidMount() {
    await this.props.getProducts();
    this.setState({ show: true });
  }
  handleDelete = (id, image) => {
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
                  try {
                    this.props.removeProduct(id);
                    this.onDelete(image);
                  } catch (e) {
                    console.log(e);
                  }
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
  onDelete = async file => {
    try {
      let fileName = file.substr(file.lastIndexOf('/') + 1);
      await ReactS3.deleteFile(fileName, config);
    } catch (err) {
      console.log(err);
    }
  };
  render() {
    const { products } = this.props;
    return (
      <Fragment>
        {!this.state.show && products.length === 0 && <Spinner />}
        <ul className="product-admin__list">
          <ReactCSSTransitionGroup
            transitionName="transition"
            transitionEnterTimeout={500}
            transitionLeaveTimeout={500}
          >
            {products.noproducts ? (
              <li>{products.noproducts}</li>
            ) : (
              products.map(product => {
                return (
                  <ProductItem
                    key={product._id}
                    {...product}
                    handleDelete={this.handleDelete}
                  />
                );
              })
            )}
          </ReactCSSTransitionGroup>
        </ul>
      </Fragment>
    );
  }
}

ProductList.propTypes = {
  getProducts: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  let products = state.product.products;
  if (products && !products.noproducts) {
    products.sort((a, b) => {
      return a.name.toUpperCase() > b.name.toUpperCase();
    });
  }
  return {
    products
  };
};

export default connect(
  mapStateToProps,
  { getProducts, removeProduct }
)(ProductList);
