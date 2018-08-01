import {
  GET_PRODUCTS,
  GET_PRODUCT,
  ADD_PRODUCT,
  EDIT_PRODUCT,
  REMOVE_PRODUCT
} from '../actions/types';

const initialState = {
  products: [],
  product: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
        product: {}
      };
    case GET_PRODUCT:
      return {
        ...state,
        product: action.payload
      };
    case ADD_PRODUCT:
      return {
        ...state,
        products: [action.payload, ...state.products],
        product: {}
      };
    case EDIT_PRODUCT:
      return {
        ...state,
        products: [...state.products],
        product: {}
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        products: state.products.filter(
          product => product._id !== action.payload
        ),
        product: {}
      };
    default:
      return state;
  }
}
