import {Component, OnInit, OnDestroy, OnChanges, Input, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from "@angular/common";

import {EntityBase} from '../../shared/model/models';
import {DataService} from '../../shared/services/data.service';
import {FieldType, FormViewSchema} from '../../shared/model/schema';
import {EntitySchemaService} from '../entity-schema.service';
import {EntityQuery} from "../../shared/model/query";
import {MdSnackBar} from "@angular/material";

@Component({
    selector: 'edit',
    templateUrl: 'edit.component.html'
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

    @Input() source: string;
    @Input() sourceId: string; // sourceId
    @Input() target: string;
    @Input() targetId: string;
    @Input() formViewSchema: FormViewSchema;

    childEdit: any;

    routeSubscription: any;
    entity: EntityBase = <EntityBase>{};
    referencesData: any = {};

    FieldType: typeof FieldType = FieldType;

    constructor(private route: ActivatedRoute,
                private location: Location,
                private dataService: DataService,
                private schemaService: EntitySchemaService,
                public snackBar: MdSnackBar) {
    }

    ngOnInit() {
        if (!this.source) {
            this.routeSubscription = this.route.params.subscribe(params => {
                this.source = this.route.snapshot.params['entity'];
                this.sourceId = this.route.snapshot.params['id'];
                this.formViewSchema = this.schemaService.getEntitySchema(this.source).formView;
                this.load(this.sourceId);
            });
        }
    }

    ngOnDestroy() {
        if (this.routeSubscription) this.routeSubscription.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        this.load(this.sourceId);
    }

    load(id: string) {
        if (id)
            this.dataService.get<EntityBase>(this.source, id).subscribe(
                data => this.entity = data
            );

        this.formViewSchema.fields
            .filter(field => field.type === FieldType.Reference)
            .forEach(field => {

                var entityQuery = new EntityQuery(field.referencePath || field.source)
                    .select(field.select.value)
                    .select(field.select.text)
                    .orderBy(field.select.text);

                this.dataService.find(entityQuery).subscribe(
                    data => this.referencesData[field.source] = data.list
                );
            });
    }

    // Remove Undefined, Null and Empty Attributes
    cleanEntity(entity: EntityBase) {
        for (let attribute in entity) {
            if (entity[attribute] == undefined || entity[attribute] == null) {
                delete entity[attribute];
            }
            else if (typeof entity[attribute] === 'object') {
                this.cleanEntity(entity[attribute]);

                if (Object.keys(entity[attribute]).length === 0)
                    delete entity[attribute];
            }
        }
    }

    save(entity: EntityBase) {

        this.cleanEntity(entity);

        //TODO: Refatorar código
        if (this.target) {
            let targetPath: string[] = this.target.split('.');

            if(targetPath.length > 1) {
                if (!entity[targetPath[0]]) entity[targetPath[0]] = {[targetPath[1]]: this.targetId};
            }
            else {
                entity[targetPath[0]] = [{id: this.targetId}];
            }
        }

        this.dataService.save(this.source, entity).subscribe(
            data => this.entity = data,
            error => this.snackBar.open('Ocorreu um erro: ' + JSON.stringify(error.json().errors), 'OK'),
            () => {
                this.sourceId = this.entity.id;
                this.snackBar.open('Operação realizada com sucesso', 'OK', {duration: 2000})
            }
        );
    }

    goBack() {
        //this.router.navigate(['entity', this.source]);
        this.location.back();
    }
}