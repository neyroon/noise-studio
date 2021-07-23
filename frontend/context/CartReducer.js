const setCartItemsToStorage = (cartItems) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(
    "cart",
    JSON.stringify(cartItems.length > 0 ? cartItems : [])
  );
};

export const sumItems = (cartItems) => {
  setCartItemsToStorage(cartItems);

  let itemCount = cartItems.reduce(
    (total, product) => total + product.quantity,
    0
  );

  let totalPrice = cartItems
    .reduce((total, product) => total + product.price * product.quantity, 0)
    .toFixed(2);

  return { itemCount, totalPrice };
};

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      if (!state.cartItems.find((item) => item.id === action.payload.id)) {
        state.cartItems.push({
          ...action.payload,
          quantity: 1,
        });
      }

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        ...sumItems(
          state.cartItems.filter((item) => item.id !== action.payload.id)
        ),
        cartItems: [
          ...state.cartItems.filter((item) => item.id !== action.payload.id),
        ],
      };
    case "INCREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity++;

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "DECREASE":
      state.cartItems[
        state.cartItems.findIndex((item) => item.id === action.payload.id)
      ].quantity--;

      return {
        ...state,
        ...sumItems(state.cartItems),
        cartItems: [...state.cartItems],
      };
    case "CLEAR":
      return {
        cartItems: [],
        ...sumItems([]),
      };
    default:
      return state;
  }
};
