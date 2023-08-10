import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, UntypedFormArray, Validators } from '@angular/forms';
import { Item, Movement } from 'src/app/model/movement';
import { Patient } from 'src/app/model/patient';
import { FormUtilsService } from 'src/app/shared/service/form-utils.service';
import { formatCpf } from 'src/app/shared/utils/cpf-utils';
import { FormValidations } from 'src/app/shared/validation/form-validations';

@Component({
  templateUrl: './supply-patient.component.html',
  styleUrls: ['./supply-patient.component.scss']
})
export class SupplyPatientComponent implements OnInit {

  movementForm!: FormGroup;
  
  constructor(
    private formBuilder: NonNullableFormBuilder,
    public formUtils: FormUtilsService
  ) { }

  ngOnInit(): void {
    const movement = {
      id: 1,
      patient: { cpf: 82423862776, name: 'Ivone Lucio Mendes Batista' } as Patient,
      company : { cnpj: 71563285000117, name: 'Psicologia Inácio'},
      sector: { id: 1, name: 'Setor 1' },
      stock: { id: 1, name: 'Estoque 10' },
      items: [
        //{id: 1, name: 'A1', amount: 15}
      ]
    } as Movement;

    this.movementForm = this.formBuilder.group({
      patient: this.formBuilder.group({
        cpf: [formatCpf(movement.patient.cpf), [Validators.required, FormValidations.cpfValidator, Validators.maxLength(14)]],
        name: [movement.patient.name, [Validators.required]]
      }),
      company: this.formBuilder.group({
        cnpj: movement.company.cnpj,
        name: movement.company.name
      }),
      sector: this.formBuilder.group({
        id: movement.sector.id,
        name: movement.sector.name
      }),
      stock: this.formBuilder.group({
        id: movement.stock.id,
        name: movement.stock.name
      }),
      items: this.formBuilder.array(this.retrieveMedicaments(movement), Validators.required),
    });
  }

  private retrieveMedicaments(movement: Movement) {
    const items = [];
    if (movement?.items) {
      movement.items.forEach(item => items.push(this.createItem(item)));
    } else {
      items.push(this.createItem());
    }
    return items;
  }

  private createItem(item: Item = { id: null, name: '', amount: null }) {
    return this.formBuilder.group({
      id: [item.id],
      name: [item.name, [Validators.required]],
      amount: [item.amount, [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.movementForm.valid) {
      console.log(this.movementForm.getRawValue())
    } else {
      this.formUtils.validateAllFormFields(this.movementForm);
    }
  }

  getItemsFormArray() {
    return (<UntypedFormArray>this.movementForm.get('items')).controls;
  }

  addNewItem() {
    const items = this.movementForm.get('items') as UntypedFormArray;
    items.push(this.createItem());
  }

  getErrorMessage(fieldName: string): string {
    return this.formUtils.getFieldErrorMessage(this.movementForm, fieldName);
  }

}
