import { Author } from './Author';
import { Category } from './Category';
import { Publisher } from './Publisher';

export interface Product extends Author, Publisher, Category {
  id: number;
  title: string;
  price: number;
  stock: number;
  isbn: string;
  publicationDate: string;
  description: string;
  originalLanguage: string;
  authors: Author[];
  categories: Category[];
  publisher: Publisher;
  coverImgUrl: string;
}
