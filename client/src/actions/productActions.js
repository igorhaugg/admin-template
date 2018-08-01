import axios from 'axios';

import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

// Get Products
export const getProducts = () => async dispatch => {
  try {
    dispatch(clearErrors());
    const res = await axios.get('/api/products');
    dispatch({
      type: GET_PRODUCTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCTS,
      payload: err.response.data
    });
  }
};

// Add Product
export const addProduct = (productData, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    const res = await axios.post('/api/products', productData);
    history.push('/admin/products');
    dispatch({
      type: ADD_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Edit Product
export const editProduct = (id, productData, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    const res = await axios.patch(`/api/products/${id}`, productData);
    history.push('/admin/products');
    dispatch({
      type: EDIT_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Get Product
export const getProduct = id => async dispatch => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    dispatch({
      type: GET_PRODUCT,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_PRODUCT,
      payload: null
    });
  }
};

// Remove Product
export const removeProduct = id => async dispatch => {
  try {
    await axios.delete(`/api/products/${id}`);
    dispatch({
      type: REMOVE_PRODUCT,
      payload: id
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
