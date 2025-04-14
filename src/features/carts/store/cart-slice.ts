import { Product } from '@/features/shops/store/product-slice';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface CartItem {
  productId: string | number;
  quantity: number;
  title: string;
  price: number;
  thumbnail: string;
  stock: number;
}

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state,
      action: PayloadAction<{ product: Product; quantity: number }>
    ) => {
      const { product, quantity } = action.payload;
      const existingItem = state.items.find(
        (item) => item.productId === product.id
      );

      if (existingItem) {
        // Don't exceed stock
        const newQuantity = Math.min(
          existingItem.quantity + quantity,
          product.stock
        );
        existingItem.quantity = newQuantity;
      } else {
        // Add new item with safe quantity
        const safeQuantity = Math.min(quantity, product.stock);
        state.items.push({
          productId: product.id,
          quantity: safeQuantity,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          stock: product.stock,
        });
      }
    },
    updateQuantity: (
      state,
      action: PayloadAction<{ productId: string | number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.productId === productId);

      if (item) {
        // Ensure quantity is within stock limits and positive
        item.quantity = Math.max(1, Math.min(quantity, item.stock));
      }
    },
    removeFromCart: (state, action: PayloadAction<string | number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.productId !== productId);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, updateQuantity, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
