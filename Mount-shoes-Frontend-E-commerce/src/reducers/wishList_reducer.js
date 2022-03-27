import {
  ADD_TO_WISHLIST,
  CLEAR_WISHLIST,
  COUNT_WISHLIST_TOTALS,
  REMOVE_WISHLIST_ITEM,
  TOGGLE_WISHLIST_ITEM_AMOUNT,
} from "../actions";

const wishlist_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST: {
    
      return {
        ...state,
        wishlist: [...state.wishlist, { ...action.payload }],
      };
    }

    case REMOVE_WISHLIST_ITEM:
      let temp_wishlist = state.wishlist.filter((item) => item.id !== action.payload);
      return { ...state, wishlist: temp_wishlist };

    case CLEAR_WISHLIST:
      return { ...state, wishlist: [] };

    case TOGGLE_WISHLIST_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      let temp_wishlist = state.wishlist.map((item) => {
        if (item.id === id) {
          let newAmount = Math.min(
            item.maxAmount,
            Math.max(1, item.amount + value)
          );
          return { ...item, amount: newAmount };
        } else {
          return item;
        }
      });
      return { ...state, wishlist: temp_wishlist };
    }

    case COUNT_WISHLIST_TOTALS: {
      const { total_items, total_amount } = state.wishlist.reduce(
        (total, current) => {
          const { price } = current;
          total.total_items += 1;
          total.total_amount += price;

          return total;
        },
        {
          total_items: 0,
          total_amount: 0,
        }
      );
      return { ...state, total_items, total_amount };
    }

    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default wishlist_reducer;
