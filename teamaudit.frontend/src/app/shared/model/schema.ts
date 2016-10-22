export interface EntitySchema {
    label: {singular: string, plural: string};
    id: {path: string};
    listView: {
        fields: EntityFieldSchema[],
        sorts: string[]
    };
    formView: {
        fields: EntityFieldSchema[]
    };
}

export interface EntitySchemaMap {
    [entityPath: string]: EntitySchema;
}

export interface EntityFieldSchema {
    label: string;
    path: string;
    referencePath?: string;
    type?: string;
    required?: boolean;
    select?: {value: string, text: string};
}