import { Company } from './company';
import { Page } from './page';

export class CompanyPage implements Page {
  content: Company[];
  totalElements: number;
  size: number;
  numberOfElements: number;
  number: number;
}
