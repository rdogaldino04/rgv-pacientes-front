import { Company } from './company';

export interface Sector {
  id: number;
  name: string;
  company: Company;
}
