import { Page } from './page';
import { Stock } from './stock';

export class StockPage implements Page {
  content: Stock[];
  totalElements: number;
  size: number;
  numberOfElements: number;
  number: number;
}
