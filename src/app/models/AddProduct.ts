export interface AddProduct {
  title: string;
  price: number;
  stock: number;
  isbn: string;
  descriptionEn: string;
  descriptionNl: string;
  coverImgUrl: string;
  publicationDate: string;
  originalLanguage: string;
  pages: number;
  categoryIds: number[];
  authorIds: number[];
  publisherId: number;
  isEnabled: boolean;
}
