import {
  GET_CATEGORIES,
  GET_CATEGORY,
  ADD_CATEGORY,
  EDIT_CATEGORY,
  REMOVE_CATEGORY
} from '../actions/types';

const initialState = {
  categories: [],
  category: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
        category: {}
      };
    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload
      };
    case ADD_CATEGORY:
      return {
        ...state,
        categories: [action.payload, ...state.categories],
        category: {}
      };
    case EDIT_CATEGORY:
      return {
        ...state,
        categories: [...state.categories],
        category: {}
      };
    case REMOVE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          category => category._id !== action.payload
        ),
        category: {}
      };
    default:
      return state;
  }
}
