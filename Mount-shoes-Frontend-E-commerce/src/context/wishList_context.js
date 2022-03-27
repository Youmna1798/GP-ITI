import React, { useEffect, useContext, useReducer } from "react";
import reducer from "../reducers/wishList_reducer";
import {
  ADD_TO_WISHLIST,
  REMOVE_WISHLIST_ITEM,
  TOGGLE_WISHLIST_ITEM_AMOUNT,
  CLEAR_WISHLIST,
  COUNT_WISHLIST_TOTALS,
} from "../actions";

const getWishlist = () => {
  let wishlist = localStorage.getItem("Wishlist");
  return wishlist ? JSON.parse(wishlist) : [];
};

const initialState = {
  wishlist: getWishlist(),
  total_items: 0,
  total_amount: 0,
  shipping: 499,
};

const WishlistContext = React.createContext();

export const WishListProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // add ot wishlist
  const addToWishlist = (obj) => {
    dispatch({ type: ADD_TO_WISHLIST, payload: obj });
  };

  // remve item
  const removeWishListItem = (id) => {
    dispatch({ type: REMOVE_WISHLIST_ITEM, payload: id });
  };
  // toggle amount
  const toggleWishListAmount = (id, value) => {
    dispatch({ type: TOGGLE_WISHLIST_ITEM_AMOUNT, payload: { id, value } });
  };

  // clear wishlist
  const clearWishlist = () => {
    dispatch({ type: CLEAR_WISHLIST });
  };

  // local storage
  useEffect(() => {
    dispatch({ type: COUNT_WISHLIST_TOTALS });
    localStorage.setItem("Wishlist", JSON.stringify(state.wishlist));
  }, [state.wishlist]);

  return (
    <WishlistContext.Provider
      value={{ ...state, addToWishlist, removeWishListItem, toggleWishListAmount, clearWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
// make sure use
export const useWishlistContext = () => {
  return useContext(WishlistContext);
};
