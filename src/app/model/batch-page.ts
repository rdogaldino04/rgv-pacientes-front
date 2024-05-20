import { Batch } from './batch';
import { Page } from './page';

export class BatchPage implements Page {
  content: Batch[];
  totalElements: number;
  size: number;
  numberOfElements: number;
  number: number;
}
