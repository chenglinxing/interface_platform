enum FieldType { }

export interface ITableField {
    fieldName: string //字段名称
    fielType?: string | number //字段类型  如果不写就是null
    fieldDesc?: string //字段描述
    fieldMinLength?: string | number //最小长度限制
    fieldMaxLength?: string | number //最大长度限制
}