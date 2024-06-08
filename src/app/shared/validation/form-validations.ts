import { UntypedFormControl } from '@angular/forms';
import { isValidCPF } from './cpf-validation';

export class FormValidations {
  static cpfValidator(control: UntypedFormControl) {
    const cpf = control.value;
    const isCpfInvalido = isValidCPF(cpf);
    if (!isCpfInvalido) {
      return { cpfInvalido: true };
    }
    return null;
  }

  static futureDateValidator(control: UntypedFormControl) {
    const dateSelected = new Date(control.value);
    const today = new Date();

    if (dateSelected <= today) {
      return { futureDate: true };
    }

    return null;
  }
}
