import { Company } from "./company";
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
    name: string;
    amount: number;

}