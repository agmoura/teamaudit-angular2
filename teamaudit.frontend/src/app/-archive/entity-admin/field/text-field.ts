import {Component, Input} from '@angular/core';
import {FieldComponent} from '../shared/field';

@Component({
    selector: 'text-field',
    template: '<span>{{record[source]}}</span>',
    providers: [{provide: FieldComponent, useExisting: TextFieldComponent}]
})
export class TextFieldComponent extends FieldComponent {
    @Input() public source: string;
    @Input() public label: string;

    constructor() {
        super();
    }
}