import { Company } from "./company";
import { Patient } from "./patient";
import { Sector } from "./sector";

export interface Movement {

    id?: number;
    patient?: Patient;
    company?: Company;
    sector?: Sector;
    stock?: any;
    items?: Item[];

}

export interface Item {

    id?: number;
    name?: string;
    amount?: number;

}