import { Company } from './company';

export interface SectorFilter {
  id?: number;
  name?: string;
  stockId?: number;
  stockName?: string;
  company?: Company;
  page?: number;
  size?: number;
}
