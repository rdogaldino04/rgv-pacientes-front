import { FormControl } from "@angular/forms";
import { isValidCPF } from "./cpf-validation";

export class FormValidations {

    static cpfValidator(control: FormControl) {

        const cpf = control.value;
        const isCpfInvalido = isValidCPF(cpf);
        if (!isCpfInvalido) {
            return { cpfInvalido: true };
        }
        return null;
    }

}
