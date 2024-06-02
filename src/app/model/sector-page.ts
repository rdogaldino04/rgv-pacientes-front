import { Page } from './page';
import { Sector } from './sector';

export class SectorPage implements Page {
  content: Sector[];
  totalElements: number;
  size: number;
  numberOfElements: number;
  number: number;
}
