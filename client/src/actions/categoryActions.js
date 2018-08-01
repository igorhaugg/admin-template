import axios from 'axios';

import {
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY,
  GET_ERRORS,
  CLEAR_ERRORS
} from './types';

// Get Categories
export const getCategories = () => async dispatch => {
  try {
    dispatch(clearErrors());
    const res = await axios.get('/api/categories');
    dispatch({
      type: GET_CATEGORIES,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORIES,
      payload: null
    });
  }
};

// Add Category
export const addCategory = (categoryData, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    const res = await axios.post('/api/categories', categoryData);
    history.push('/admin/categories');
    dispatch({
      type: ADD_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Edit Category
export const editCategory = (id, categoryData, history) => async dispatch => {
  try {
    dispatch(clearErrors());
    const res = await axios.patch(`/api/categories/${id}`, categoryData);
    history.push('/admin/categories');
    dispatch({
      type: EDIT_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};

// Get Category
export const getCategory = id => async dispatch => {
  try {
    const res = await axios.get(`/api/categories/${id}`);
    dispatch({
      type: GET_CATEGORY,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY,
      payload: null
    });
  }
};

// Remove Category
export const removeCategory = id => async dispatch => {
  try {
    await axios.delete(`/api/categories/${id}`);
    dispatch({
      type: REMOVE_CATEGORY,
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
