import { Patient } from "./patient";

export interface Movement {

    id?: number;
    patient?: Patient;
    company?: any;
    sector?: any;
    stock?: any;
    items?: Item[];

}

export interface Item {

    id?: number;
    name?: string;
    amount?: number;

}