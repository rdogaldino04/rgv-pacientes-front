import { Material } from './material';
import { Page } from './page';
export class MaterialPage implements Page {
  content: Material[];
  totalElements: number;
  size: number;
  numberOfElements: number;
  number: number;
}
