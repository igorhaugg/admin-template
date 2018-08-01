import React from 'react';
import { Link } from 'react-router-dom';

import Dashboard from '../dashboard/Dashboard';
import CategoryList from './CategoryList';
import Button from '../../../common/Button';

import './Category.css';

const Category = () => (
  <Dashboard title="Category" componentClass="category-admin">
    <div>
      <span className="category-admin__title">Add new category</span>
      <Link to="/admin/categories/add">
        <Button text="+" desc="add" />
      </Link>
    </div>
    <CategoryList />
  </Dashboard>
);

export default Category;
