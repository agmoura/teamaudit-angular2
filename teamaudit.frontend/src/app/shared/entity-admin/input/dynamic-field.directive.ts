import {ComponentFactoryResolver, ComponentRef, Directive, Input, OnChanges, OnInit, Type, ViewContainerRef} from '@angular/core';
import {FormGroup} from "@angular/forms";
import {FieldType, FormFieldSchema} from "../model/schema";
import {FieldComponent} from "../model/field";
import {TextInputComponent} from "./text-input";
import {BooleanInputComponent} from "./boolean-input";
import {NumberInputComponent} from "./number-input";
import {DateInputComponent} from "./date-input";
import {SelectInputComponent} from "./select-input";
import {GroupInputComponent} from "./group-input";

const components: {[type: number]: Type<FieldComponent<any>>} = {
    [FieldType.Text]: TextInputComponent,
    [FieldType.Boolean]: BooleanInputComponent,
    [FieldType.Number]: NumberInputComponent,
    [FieldType.Date]: DateInputComponent,
    [FieldType.Reference]: SelectInputComponent,
    [FieldType.Group]: GroupInputComponent
};

// REFERENCE: https://toddmotto.com/angular-dynamic-components-forms
@Directive({
    selector: '[dynamicField]'
})
export class DynamicFieldDirective<T> implements OnInit, OnChanges {
    @Input('dynamicField') schema: FormFieldSchema<T>;
    @Input() group: FormGroup;
    component: ComponentRef<FieldComponent<T>>;

    constructor(private container: ViewContainerRef, private resolver: ComponentFactoryResolver) {

    }

    ngOnInit() {
        const factory = this.resolver.resolveComponentFactory(components[this.schema.type]);
        this.component = this.container.createComponent(factory);
        this.component.instance.schema = this.schema;
        this.component.instance.group = this.group;
    }

    ngOnChanges() {
        if (this.component) {
            this.component.instance.schema = this.schema;
            this.component.instance.group = this.group;
        }
    }
}
