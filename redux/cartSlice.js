import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

const initialState = {
  cartItems: [],
};

const saveCartToStorage = async (cartItems) => {
  try {
    await AsyncStorage.setItem("cart", JSON.stringify(cartItems));
  } catch (error) {
    console.error("Failed to save cart data to storage:", error);
  }
};

const loadCartFromStorage = async () => {
  try {
    const cartData = await AsyncStorage.getItem("cart");
    if (cartData) {
      return JSON.parse(cartData);
    }
    return [];
  } catch (error) {
    console.error("Failed to load cart data from storage:", error);
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex >= 0) {
        state.cartItems[existingItemIndex].quantity += action.payload.quantity;
      } else {
        state.cartItems.push(action.payload);
      }
      saveCartToStorage(state.cartItems);
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== id); // Remove the item by ID
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage([]);
    },
    updateCartQuantity: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index >= 0) {
        state.cartItems[index].quantity = action.payload.quantity;
      }
      saveCartToStorage(state.cartItems);
    },
  },
  extraReducers: (builder) => {
    builder.addCase("cart/loadCart", (state, action) => {
      state.cartItems = action.payload;
    });
  },
});

export const {
  addToCart,
  removeFromCart,
  clearCart,
  updateCartQuantity,
  setCart,
} = cartSlice.actions;

// New async thunk to load the cart from storage on app start.
export const loadCart = () => async (dispatch) => {
  const cartItems = await loadCartFromStorage();
  dispatch(setCart(cartItems));
};

export default cartSlice.reducer;
