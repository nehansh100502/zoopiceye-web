import React, { createContext, useContext, useReducer } from 'react';

// Create a Context for the Cart
export const CartContext = createContext();

// Initial state for the cart
const initialState = {
  cartItems: [],
};

// Reducer function to manage cart actions
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItemIndex = state.cartItems.findIndex(item => item._id === action.payload._id);
      if (existingItemIndex >= 0) {
        // If item already exists, update quantity
        const updatedCartItems = state.cartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + action.payload.quantity } : item
        );
        return { ...state, cartItems: updatedCartItems };
      } else {
        // If item does not exist, add new item
        return { ...state, cartItems: [...state.cartItems, action.payload] };
      }

    case 'REMOVE_ITEM':
      return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.payload._id) };

    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload._id ? { ...item, quantity: action.payload.quantity } : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};

// CartProvider component to wrap around your application
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (itemId) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { _id: itemId } });
  };

  const updateItemQuantity = (itemId, quantity) => {
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { _id: itemId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addItem, removeItem, updateItemQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use the CartContext
export const useCart = () => {
  return useContext(CartContext);
};
