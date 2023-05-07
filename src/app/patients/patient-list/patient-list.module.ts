import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { PatientListComponent } from "./patient-list.component";
import { AppMaterialModule } from "src/app/shared/app-material/app-material.module";

@NgModule({
    declarations: [PatientListComponent],
    exports: [PatientListComponent],
    imports: [
        CommonModule,
        AppMaterialModule
    ],
})
export class PatientListModule {

}