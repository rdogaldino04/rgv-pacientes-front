import { Address } from './address';
export interface Patient {

  id?: number;
  cpf: number;
  name: string;
  phone?: string;
  address?: Address;

}
