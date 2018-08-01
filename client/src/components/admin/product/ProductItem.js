import React from 'react';
import { Link } from 'react-router-dom';

import EditImage from '../images/edit.png';
import DeleteImage from '../images/delete.png';

const ProductItem = ({ name, _id, image, handleDelete }) => (
  <li className="product-admin__item">
    <span>{name}</span>
    <ul className="product-admin__actions">
      <li>
        <Link to={`/admin/products/edit/${_id}`}>
          <img
            src={EditImage}
            alt="Edit Icon"
            title="Edit product"
            className="product-admin__icon product-admin__icon-hover"
          />
        </Link>
      </li>
      <li>
        <Link to={`/admin/products`}>
          <img
            src={DeleteImage}
            alt="Delete Icon"
            title="Delete product"
            className="product-admin__icon product-admin__icon-hover"
            onClick={() => handleDelete(_id, image)}
          />
        </Link>
      </li>
    </ul>
  </li>
);

export default ProductItem;
