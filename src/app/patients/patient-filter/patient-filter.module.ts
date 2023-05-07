import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule } from "ngx-mask";
import { PatientFilterComponent } from "./patient-filter.component";
import { AppMaterialModule } from "src/app/shared/app-material/app-material.module";

@NgModule({
    declarations: [PatientFilterComponent],
    exports: [PatientFilterComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule,
        NgxMaskModule.forChild()
    ],
})
export class PatientFilterModule {

}