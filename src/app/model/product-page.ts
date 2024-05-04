import { Page } from './page';
import { Product } from './product';

export class ProductPage implements Page {
  content: Product[];
  totalElements: number;
  size: number;
  numberOfElements: number;
  number: number;
}
