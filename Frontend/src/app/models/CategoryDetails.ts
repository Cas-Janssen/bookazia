import { Category } from './Category';
import { Product } from './Product';

export interface CategoryDetails extends Category {
  products: Product[] | null;
}
