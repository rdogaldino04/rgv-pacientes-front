export interface MovimentItem {
  id: number;
  product: ProductMovementItemInput;
  amount: number;
}

interface ProductMovementItemInput {
  id: number;
  name: string;
}
