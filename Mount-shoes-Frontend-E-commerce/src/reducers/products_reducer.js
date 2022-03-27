import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from "../actions";

const products_reducer = (state, action) => {
  switch (action.type) {
    // sidebar
    case SIDEBAR_OPEN:
      return { ...state, isSidebarOpen: true };

    case SIDEBAR_CLOSE:
      return { ...state, isSidebarOpen: false };

    // all products
    case GET_PRODUCTS_BEGIN:
      return { ...state, all_products_loading: true };

    case GET_PRODUCTS_SUCCESS:
      const featured_products = action.payload.filter(
        (product) => product.featured === true
      );
      return {
        ...state,
        all_products_loading: false,
        all_products: action.payload,
        featured_products,
      };

    case GET_PRODUCTS_ERROR:
      return {
        ...state,
        all_products_loading: false,
        all_products_error: true,
      };

    // single product
    case GET_SINGLE_PRODUCT_BEGIN:
      return {
        ...state,
        single_product_loading: true,
        single_product_error: false,
        // in case there is an old error from a previous product fetch
      };

    case GET_SINGLE_PRODUCT_SUCCESS:
      return {
        ...state,
        single_product_loading: false,
        single_product: action.payload,
      };

    case GET_SINGLE_PRODUCT_ERROR:
      return {
        ...state,
        single_product_loading: false,
        single_product_error: true,
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default products_reducer;
