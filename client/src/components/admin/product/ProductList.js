import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactS3 from '../../../common/react-s3';
import { connect } from 'react-redux';

import ProductItem from './ProductItem';
import Spinner from '../../../common/Spinner';

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
    // confirmation
    try {
      this.props.removeProduct(id);
      this.onDelete(image);
    } catch (e) {
      console.log(e);
    }
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
