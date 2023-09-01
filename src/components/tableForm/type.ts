import type { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { Table } from 'element-plus'

export interface ITableProps {
    tableData: Array<object>; //表格数据
    columns: Table.Column[];
    options?: Table.options
}

type columnType = 'text' | 'input' | 'select' | 'date' | 'inputNumber'
interface IElSelect {
    label: string,
    value: string | number
}
export interface ITableTitleList {
    prop: string;//属性名
    label: string;//列名
    type: columnType//列展示
    options?: Table.options, //column其他参数
    selectItems?: Array<IElSelect>
}