import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { id } = action.payload;
      const temp_item = state.cart.find((item) => item.id === id);
      if (temp_item) {
        const temp_cart = state.cart.map((item) => {
          if (item.id === id) {
            let new_amount = item.quantity + 1;
            return { ...item, quantity: new_amount };
          } else {
            return item;
          }
        });

        return { ...state, cart: temp_cart };
      } else {
        const newItem = {
          ...action.payload,
          quantity: 1,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }
    }

    case REMOVE_CART_ITEM:
      const temp_item = state.cart.find((item) => item.id === action.payload);
      if (temp_item.quantity > 1) {
        const temp_cart = state.cart.map((item) => {
          if (item.id === action.payload) {
            let new_amount = item.quantity - 1;
            return { ...item, quantity: new_amount };
          } else {
            return item;
          }
        });

        return { ...state, cart: temp_cart };
      } else {
        let temp_cart = state.cart.filter((item) => item.id !== action.payload);
        return { ...state, cart: temp_cart };
      }

    case CLEAR_CART:
      return { ...state, cart: [] };

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      let temp_cart = state.cart.map((item) => {
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
      return { ...state, cart: temp_cart };
    }

    case COUNT_CART_TOTALS: {
      const { total_items, total_amount } = state.cart.reduce(
        (total, current) => {
          const { price , quantity } = current;
          total.total_items += quantity;
          total.total_amount += price * quantity;

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

export default cart_reducer;
