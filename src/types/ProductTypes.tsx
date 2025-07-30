export interface ProductTypes {
  id: string;
  isFavorite: boolean;
  tags: string[];
  name: string;
  price: number;
  discountedPrice?: number;
  reviews: number;
  rating: number;
  description: string;
  images: string[];
  colors: string[];
  createdAt: Date;
  categoryId: string;
  sizes: string[];
}
