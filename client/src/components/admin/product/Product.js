import React from 'react';
import { Link } from 'react-router-dom';

import Dashboard from '../dashboard/Dashboard';
import ProductList from './ProductList';
import Button from '../../../common/Button';

import './Product.css';

const Product = () => (
  <Dashboard title="Product" componentClass="product-admin">
    <div>
      <span className="product-admin__title">Add new product</span>
      <Link to="/admin/products/add">
        <Button text="+" desc="add" />
      </Link>
    </div>
    <ProductList />
  </Dashboard>
);

export default Product;
