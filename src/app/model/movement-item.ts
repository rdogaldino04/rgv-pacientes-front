import { Batch } from './batch';

export interface MovimentItem {
  id?: number;
  batch: { id: null };
  quantity: number;
}
