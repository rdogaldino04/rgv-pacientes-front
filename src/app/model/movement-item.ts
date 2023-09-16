export interface MovimentItem {

    id: number;
    material: MaterialMovementItemInput;
    amount: number;

}

interface MaterialMovementItemInput {
    id: number;
    name: string;
}
