import {NgModule} from "@angular/core";
import {Routes, RouterModule} from '@angular/router';
import {CategoriaObjetivoComponent} from "./objective/categoria-objetivo.component";
import {entidadeRoutes} from "./";

const routes: Routes = [
    {path: 'categoriaObjetivo', component: CategoriaObjetivoComponent},
    ...entidadeRoutes
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class MasterDataRoutingModule {
}