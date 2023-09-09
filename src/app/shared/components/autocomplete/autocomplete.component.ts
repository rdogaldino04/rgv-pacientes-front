import { Component, Input } from "@angular/core";
import { UntypedFormControl } from "@angular/forms";

@Component({
    selector: 'app-rgv-autocomplete',
    templateUrl: './autocomplete.component.html',
    
})
export class AutocompleteComponent {

    @Input() title: string = '';

    @Input() items = [
        // {id: 1, name: 'AAAA'},
        // {id: 2, name: 'ABBB'},
        // {id: 3, name: 'BAAA'},
    ];

    @Input() formControlName: UntypedFormControl;

    displayFn(item: any) {
        return item?.name;
    }

    onOptionSelected(event) {
         console.log(event);
        
    }
}