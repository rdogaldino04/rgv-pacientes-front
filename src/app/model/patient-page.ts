import { Page } from './page';
import { Patient } from './patient';
export class PatientPage implements Page {
  
  content: Patient[];
  totalElements: number;
  size: number;
  numberOfElements: number;
  number: number;

}
