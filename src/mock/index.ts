import Mock from "mockjs";
import { ITableField } from "@/views/home/type.ts"

const test = (url: string, method: string, data: any) => {
    let res = changeData(data)
    Mock.mock(url, method, res)
}

/**
 * 处理传入的data
 * 
 */
const changeData = (data: Array<ITableField>) => {
    return data
}

/**
 * 格式化字段类型
 * 例如：将fileType = int、minlength = n,maxlength = m 则映射为"@integer(n, m)",
 */
const formatFieldType = (fileProp: ITableField) => {
    let { fieldName, fielType, fieldDesc, fieldMinLength, fieldMaxLength } = fileProp
    let min = fieldMinLength || 1
    let max = fieldMaxLength || 4
    const fieldMap = {
        'string': Mock.mock(`@cparagraph(${min},${max})`), //字符串
        'int': Mock.Random.integer(min, max),
        'boolean': Mock.Random.boolean(),
    }
}
export { Mock, test } 