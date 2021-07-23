import React, { createContext, useReducer } from "react";
import { CartReducer, sumItems } from "./CartReducer";

export const CartContext = createContext();

const getCartItemsFromStorage = () => {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const initialState = {
  cartItems: getCartItemsFromStorage(),
  ...sumItems(getCartItemsFromStorage()),
};

const CartContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(CartReducer, initialState);

  const increase = (payload) => {
    dispatch({ type: "INCREASE", payload });
  };

  const decrease = (payload) => {
    dispatch({ type: "DECREASE", payload });
  };

  const addProduct = (payload) => {
    dispatch({ type: "ADD_ITEM", payload });
  };

  const removeProduct = (payload) => {
    dispatch({ type: "REMOVE_ITEM", payload });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR" });
  };

  const contextValues = {
    removeProduct,
    addProduct,
    increase,
    decrease,
    clearCart,
    ...state,
  };

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
