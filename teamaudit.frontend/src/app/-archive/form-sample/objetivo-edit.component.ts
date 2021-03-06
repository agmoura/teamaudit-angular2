import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

import {Objetivo, CategoriaObjetivo, UnidadeOrganizacional} from "../../shared/model/models";
import {DataService} from "../../shared/services/data.service";

@Component({
    selector: 'objetivo-edit',
    templateUrl: './objetivo-edit.component.html'
})
export class ObjetivoEditComponent implements OnInit {

    objetivo:Objetivo = <Objetivo>{};
    categorias:CategoriaObjetivo[] = [];
    unidades:UnidadeOrganizacional[] = [];
    errors:any;

    detalhes = {};

    constructor(private route:ActivatedRoute, private router:Router, private dataService:DataService) { }

    ngOnInit() {
        this.load(this.route.snapshot.params['id'])
    }

    load(id:string) {
        if (id)
            this.dataService.get<Objetivo>('objetivo', id).subscribe(
                data => this.objetivo = data
            );

        this.dataService.findAll('categoriaObjetivo').subscribe(
            data => this.categorias = data.list
        );

        this.dataService.findAll('unidadeOrganizacional').subscribe(
            data => this.unidades = data.list
        );
    }

    save(objetivo:Objetivo) {

        this.dataService.save('objetivo', objetivo).subscribe(
            data => this.objetivo = data,
            error => this.errors = error,
            () => this.goBack()
        );
    }

    goBack() {
        this.router.navigate(['/objetivo']);
    }
}
