import { MovimentItem } from './movement-item';

export interface MovementInput {
  id: number;
  patient: PatientMovementInput;
  stock: StockMovementInput;
  items: MovimentItem[];
}

interface PatientMovementInput {
  id: number;
  name: string;
  cpf: string;
}

interface CompanyMovementInput {
  id: number;
  name: string;
}

interface SectorMovementInput {
  id: number;
  name: string;
}

interface StockMovementInput {
  id: number;
  name: string;
}
