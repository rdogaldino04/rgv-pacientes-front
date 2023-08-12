import { Company } from "./company";
import { Patient } from "./patient";

export interface Movement {

    id?: number;
    patient?: Patient;
    company?: Company;
    sector?: any;
    stock?: any;
    items?: Item[];

}

export interface Item {

    id?: number;
    name?: string;
    amount?: number;

}