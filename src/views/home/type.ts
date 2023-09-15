enum FieldType { }

export interface ITableField {
    fieldName: string //字段名称
    fielType?: string | number //字段类型  如果不写就是null
    fieldDesc?: string //字段描述
    fieldMinLength?: string | number //最小长度限制 | 如果是数字则是最小值
    fieldMaxLength?: string | number //最大长度限制 | 如果是数字则是最小值
}

export enum EParamsType {
    'Boolean' = 'boolean',
    'Date' = "date",
    // 'Function' = "2",
    // 'NaN' = '3',
    'Number' = 'number',
    'Float' = 'float',
    'Integer' = 'integer',
    'RegExp' = 'regExp',
    'String' = 'string',
    'Undefined' = 'undefined',
    'Null' = 'null',
} 