import {DataSourceDefinition} from "../shared/data-source";

export enum FieldType {
    Hidden, Text, RichText, Number, Boolean, Date, Reference, ReferenceMany
}

export enum ReferenceType {
    OneToMany, ManyToOne, ManyToMany, OneToOne
}

export interface ResourceSchemaMap {
    [resource: string]: ResourceSchema;
}

export interface ResourceSchema {
    listView: ListViewSchema;
    formView: FormViewSchema;
    treeView?: TreeViewSchema;
}

export interface ListViewSchema {
    fields: ListFieldSchema[];
    orders?: string[];
    filter?: any;
    select?: boolean;

    actions?: ActionSchema[];
    insert?: boolean;
    link?: boolean;
}

export interface FormViewSchema {
    fields: FormFieldSchema[];
    references?: ReferenceSchema[];
}

//TODO: Refatorar
export interface TreeViewSchema {
    loadFrom?: string;
    recursiveRelationship?: boolean;
    treeNodes: TreeNodeSchema[];
}

export interface ReferenceSchema extends ResourceSchema {
    resource: string;
    type: ReferenceType;
    target: string;
    targetInverse?: string;

    /*targetId: {path: string};
    referencePath?: string;
    relationPath?: {path: string};
    childSelectListView?: ListViewSchema;*/
}

export interface FieldSchema {
    source: string;         // Field Name
    type?: FieldType;       // Field Type
    label?: string;         // Field Label Key - Default: UpperCase(Resource + '.' + Source)
    required?: boolean;     // Indica que este campo é obrigatorio
    hidden?: boolean;
    index?: number;         // Field Index - Read Only
}

export interface ListFieldSchema extends FieldSchema {

}

export interface FormFieldSchema extends FieldSchema {
    dataSource?: DataSourceDefinition<any>;
}

export interface TreeNodeSchema {
    entityLabel: string;            // O label da entidade exemplo: Atividade da Auditoria
    entityName: string;             // O nome da entidade exemplo: AuditoriaAtividade
    entityLabelPath?: string;       // O campo no objeto da entidade com o nome da mesma, exemplo: Atividade da auditoria XPTO
    parentPath: string;             // O campo da entidade com o qual este nó se liga ao nó anterior
    fields: ListFieldSchema[];   // Configuração dos campos a exibir na arvore
    actionsVisible?: boolean;       // Indica se as ações de incluir, editar e excluir estarão fisiveis na arvore, default: true
    sorts?: string[]; // TODO TROCAR PAR ORDERS              // Paths usados para ordenar os resultados da arvore
}

export interface ActionSchema {
    label: string;
    icon: string;
    actionPath?: string;
    actionTsFunction?: string;
    getSucessRedirectCommandsFunction?: Function;
    successMessage?: string;
    parameterSelectedEntities?: boolean;
}


/*export class TextInput implements FormFieldSchema {
 public type?: FieldType = FieldType.Text;

 constructor(public path: string) {
 }
 }

 export class ReferenceInput implements FormFieldSchema {
 public type: FieldType = FieldType.Reference;

 constructor(public path: string, public referencePath: string = null) {

 }
 }*/
