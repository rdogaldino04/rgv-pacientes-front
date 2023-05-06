import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgxMaskModule } from "ngx-mask";
import { PatientFilterComponent } from "./patient-filter.component";

@NgModule({
    declarations: [PatientFilterComponent],
    exports: [PatientFilterComponent],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatToolbarModule,
        NgxMaskModule.forChild()
    ],
})
export class PatientFilterModule {

}