import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ListViewSchema, ResourceSchema} from '../model/schema';

@Component({
    selector: 'list',
    templateUrl: 'list.component.html'
})
export class ListComponent implements OnInit, OnDestroy {

    routeSubscription: any;
    resource: string;
    listViewSchema: ListViewSchema;

    constructor(private route: ActivatedRoute, private router: Router) {

    }

    ngOnInit() {
        this.routeSubscription = this.route.data.subscribe(data => {
            let schema: ResourceSchema = data.schema;
            if (schema instanceof Function) schema = schema();

            this.listViewSchema = schema.listView;
            this.resource = schema.resource;
        });
    }

    ngOnDestroy() {
        this.routeSubscription.unsubscribe();
    }

    create() {
        // this.router.navigate(['entity', this.resource, 'edit']);
        this.router.navigate(['edit'], {relativeTo: this.route});
    }

    edit(id: string) {
        // this.router.navigate(['entity', this.resource, 'edit', id]);
        this.router.navigate(['edit', id], {relativeTo: this.route});
    }
}
