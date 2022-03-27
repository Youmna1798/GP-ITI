import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from "../actions";

const filter_reducer = (state, action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      let maxPrice = Math.max(
        ...action.payload.map((product) => product.price)
      );

      return {
        ...state,
        all_products: [...action.payload],
        filtered_products: [...action.payload],
        filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
      };

    case SET_GRIDVIEW:
      return { ...state, grid_view: true };

    case SET_LISTVIEW:
      return { ...state, grid_view: false };

    case UPDATE_SORT:
      return { ...state, sort: action.payload };

    case SORT_PRODUCTS:
      let tempProducts = [...state.filtered_products];

      switch (state.sort) {
        case "price-lowest":
          tempProducts = tempProducts.sort((a, b) => a.price - b.price);
          break;

        case "price-highest":
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
          break;

        case "name-a":
          tempProducts = tempProducts.sort((a, b) => {
            return a.name.localeCompare(b.name);
          });
          break;

        case "name-z":
          tempProducts = tempProducts.sort((a, b) => {
            return b.name.localeCompare(a.name);
          });
          break;
      }
      return { ...state, filtered_products: tempProducts };

    case UPDATE_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          [action.payload.name]: action.payload.value,
        },
      };

    case FILTER_PRODUCTS:
      const { all_products } = state;
      const { text, category, company, color, price, shipping } = state.filters;

      let temp_products = [...all_products];

      // filtering
      // text
      if (text) {
        temp_products = temp_products.filter((product) => {
          return product.name.toLowerCase().includes(text.toLowerCase());
        });
      }

      // category
      if (category !== "all") {
        temp_products = temp_products.filter(
          (product) => product.category === category
        );
      }

      // company
      if (company !== "all") {
        temp_products = temp_products.filter(
          (product) => product.company === company
        );
      }

      // colors
      if (color !== "all") {
        temp_products = temp_products.filter((product) => {
          return product.colors.find((c) => c === color);
        });
      }

      // price
      temp_products = temp_products.filter((product) => product.price <= price);

      // shipping
      if (shipping) {
        temp_products = temp_products.filter((product) => product.shipping);
      }

      return { ...state, filtered_products: temp_products };

    case CLEAR_FILTERS:
      return {
        ...state,
        filters: {
          ...state.filters,
          text: "",
          company: "all",
          category: "all",
          color: "all",
          price: state.filters.max_price,
          shipping: false,
        },
      };

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
