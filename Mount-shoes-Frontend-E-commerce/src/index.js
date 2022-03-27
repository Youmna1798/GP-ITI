import React  from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ProductsProvider } from "./context/products_context";
import { FilterProvider } from "./context/filter_context";
import { CartProvider } from "./context/cart_context";
import { WishListProvider } from "./context/wishList_context";
import {createStore , compose , applyMiddleware} from 'redux';
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from './store/reducers/auth'
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.js'


const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose 

const store = createStore(reducer ,composeEnhances(
  applyMiddleware(thunk)
))


ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}>
     <ProductsProvider>
        <FilterProvider>
          <WishListProvider>
          <CartProvider>
            <App />
          </CartProvider>
          </WishListProvider>
        </FilterProvider>
      </ProductsProvider>
     </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

