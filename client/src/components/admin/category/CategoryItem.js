import React from 'react';
import { Link } from 'react-router-dom';

import EditImage from '../images/edit.png';
import DeleteImage from '../images/delete.png';

const CategoryItem = ({ name, _id, onDelete }) => (
  <li className="category-admin__item">
    <span>{name}</span>
    <ul className="category-admin__actions">
      <li>
        <Link to={`/admin/categories/edit/${_id}`}>
          <img
            src={EditImage}
            alt="Edit Icon"
            title="Edit category"
            className="category-admin__icon category-admin__icon-hover"
          />
        </Link>
      </li>
      <li>
        <Link to={`/admin/categories`}>
          {/* <Link to={`/admin/categories/delete/${_id}`}> */}
          <img
            src={DeleteImage}
            alt="Delete Icon"
            title="Delete category"
            className="category-admin__icon category-admin__icon-hover"
            onClick={() => onDelete(_id)}
          />
        </Link>
      </li>
    </ul>
  </li>
);

export default CategoryItem;
