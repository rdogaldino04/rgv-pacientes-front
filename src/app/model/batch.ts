import { Product } from './product';

export interface Batch {
  id?: number;
  batchNumber?: string;
  manufactureDate?: Date;
  expiryDate?: Date;
  product?: Product;
}
