import { Location } from "@angular/common";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormGroup, NonNullableFormBuilder, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs";
import { Material } from "src/app/model/material";
import { MaterialService } from "src/app/service/material.service";
import { FormUtilsService } from "src/app/shared/service/form-utils.service";
import { Error } from 'src/app/model/error';
import { FormValidations } from "src/app/shared/validation/form-validations";

@Component({
    templateUrl: './material-form.component.html',
    styleUrls: ['./material-form.component.scss']
})
export class MaterialFormComponent implements OnInit, OnDestroy {

    form!: FormGroup;
    subscription: Subscription;
    edit = false;

    constructor(
        private formBuilder: NonNullableFormBuilder,
        private route: ActivatedRoute,
        private location: Location,
        private materialService: MaterialService,
        private snackBar: MatSnackBar,
        private formUtilsService: FormUtilsService
    ) { }

    ngOnInit(): void {
        this.subscription = this.route.data.subscribe((info: { material: Material }) => {
            this.edit = !!info.material?.id;
            this.materialFormBuilder(info.material ? info.material : {})
        });
    }

    private materialFormBuilder(material: Material) {
        this.form = this.formBuilder.group({
            id: [material?.id],
            name: [material?.name, [Validators.required]],
            expirationDate: [material?.expirationDate, [Validators.required, FormValidations.futureDateValidator]]
        });
        this.form.get('id').disable();
    }

    ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    onSubmit(): void {
        if (!this.form.valid) {
            this.formUtilsService.validateAllFormFields(this.form);
            return;
        }
        if (this.edit) {
            this.update();
        } else {
            this.create();
        }
    }

    private create(): void {
        this.materialService.create(this.form.getRawValue() as Material)
            .subscribe(() => this.onSuccess(),
                (response) => this.onError(response.error)
            );
    }

    private update(): void {
        this.materialService.update(this.form.getRawValue() as Material)
            .subscribe(() => this.onSuccess(),
                (response) => this.onError(response.error)
            );
    }

    private onSuccess(): void {
        this.snackBar.open('Paciente salvo com sucesso!', '', { duration: 5000 });
        this.onCancel();
    }

    private onError(error: Error): void {
        if (error) {
            this.snackBar.open(error.detail, '', { duration: 5000 });
            return;
        }
        this.snackBar.open('Erro ao salvar material.', '', { duration: 5000 });
    }

    private onCancel() {
        this.location.back();
    }

    getErrorMessage(fieldName: string): string {
        return this.formUtilsService.getFieldErrorMessage(this.form, fieldName);
    }

}
