import { createContext, useContext, useReducer } from "react";
const { products } = require("../config/products.json");

export const AppContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let cartproducts;
      if (
        state.itemsInCart?.find(
          (item) => item?.productId === action.payload._id
        )
      ) {
        cartproducts = state.itemsInCart?.map((item) =>
          item?.productId === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        cartproducts = [
          ...state.itemsInCart,
          { productId: action.payload._id, quantity: 1 },
        ];
      }
      return { ...state, itemsInCart: cartproducts };

    case "ADD_TO_WISHLIST":
      let wishlist;
      if (
        state.itemsInWishlist?.find(
          (item) => item.productId === action.payload._id
        )
      ) {
        wishlist = [...state.itemsInWishlist];
      } else {
        wishlist = [
          ...state.itemsInWishlist,
          { productId: action.payload._id },
        ];
      }
      return { ...state, itemsInWishlist: wishlist };

    case "REMOVE_FROM_CART":
      let filterdCart = state.itemsInCart?.filter(
        (item) => item?.productId !== action.payload._id
      );
      return { ...state, itemsInCart: filterdCart };

    case "REMOVE_FROM_WISHLIST":
      let filteredWishlist = state.itemsInWishlist?.filter(
        (item) => item?.productId !== action.payload._id
      );
      return { ...state, itemsInWishlist: filteredWishlist };

    case "MOVE_TO_CART":
      let productCart;
      let newWishlist = state.itemsInWishlist?.filter(
        (item) => item?.productId !== action.payload._id
      );

      if (
        state.itemsInCart?.find(
          (item) => item?.productId === action.payload._id
        )
      ) {
        productCart = state.itemsInCart?.map((item) =>
          item?.productId === action.payload._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        productCart = [
          ...state.itemsInCart,
          { productId: action.payload._id, quantity: 1 },
        ];
      }
      return {
        ...state,
        itemsInCart: productCart,
        itemsInWishlist: newWishlist,
      };

    case "MOVE_TO_WISHLIST":
      let newCart = state.itemsInCart?.filter(
        (item) => item?.productId !== action.payload._id
      );
      let productwishlist;
      if (
        state.itemsInWishlist.find(
          (item) => item.productId === action.payload._id
        )
      ) {
        productwishlist = [...state.itemsInWishlist];
      } else {
        productwishlist = [
          ...state.itemsInWishlist,
          { productId: action.payload._id },
        ];
      }
      return {
        ...state,
        itemsInCart: newCart,
        itemsInWishlist: productwishlist,
      };

    case "INCREMENT_QUANTITY":
      let incrementedCart = state.itemsInCart?.map((item) =>
        item.productId === action.payload._id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      return { ...state, itemsInCart: incrementedCart };

    case "DECREMENT_QUANTITY":
      let decrementedCart = state.itemsInCart?.map((item) =>
        item.productId === action.payload._id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
      return { ...state, itemsInCart: decrementedCart };

    default:
      return state;
  }
};

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, {
    productList: products,
    itemsInCart: [],
    itemsInWishlist: [],
  });

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext);
};
