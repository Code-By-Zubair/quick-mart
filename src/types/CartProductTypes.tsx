import { ProductTypes } from "./ProductTypes";

export interface CartProductTypes {
  productDetails: ProductTypes;
  quantity: number;
  color?: string;
  size?: string;
  id: string; // Unique identifier for the cart item
}
