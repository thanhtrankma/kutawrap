export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  comboId?: string;
  comboName?: string;
  toppingIds?: string[];
  toppingNames?: string[];
}

export interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  removeItem: (productId: string, comboId?: string) => void;
  updateQuantity: (productId: string, quantity: number, comboId?: string) => void;
  clearCart: () => void;
  total: number;
  count: number;
}
