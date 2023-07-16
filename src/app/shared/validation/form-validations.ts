import { UntypedFormControl } from "@angular/forms";
import { isValidCPF } from "./cpf-validation";

export class FormValidations {

    static cpfValidator(control: UntypedFormControl) {

        const cpf = control.value;
        const isCpfInvalido = isValidCPF(cpf);
        if (!isCpfInvalido) {
            return { cpfInvalido: true };
        }
        return null;
    }

}
