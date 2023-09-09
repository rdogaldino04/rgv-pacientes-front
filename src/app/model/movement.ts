import { Company } from "./company";
import { MovimentItem } from "./movement-item";
import { Patient } from "./patient";
import { Sector } from "./sector";
import { Stock } from "./stock";

export interface Movement {

    id?: number;
    patient?: Patient;
    company?: Company;
    sector?: Sector;
    stock?: Stock;
    items?: MovimentItem[];

}
