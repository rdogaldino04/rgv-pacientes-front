import { Company } from "./company";
import { Material } from "./material";
import { Patient } from "./patient";
import { Sector } from "./sector";
import { Stock } from "./stock";

export interface Movement {

    id?: number;
    patient?: Patient;
    company?: Company;
    sector?: Sector;
    stock?: Stock;
    items?: Item[];

}

export interface Item {

    id: number;
    material: Material;
    amount: number;

}