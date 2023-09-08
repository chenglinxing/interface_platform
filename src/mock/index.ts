import Mock from "mockjs";
import { ITableField, EParamsType } from "@/views/home/type.ts"


/**
 * 生成数据
 * @param url 路径
 * @param method 方法  get|post|patch|delete
 * @param data 传入的参数
 * @param dataLen 需要返回多少调数据
 */
const createData = (url: string, method: string, data: any, dataLen = 10) => {
    let list = []
    for (let i = 0; i < dataLen; i++) {
        let res = createRowData(data);
        list.push(res)
    }

    Mock.mock(url, method, list)
}

/**
 * 处理传入的data 生成一条数据
 * 
 */
const createRowData = (data: Array<ITableField>) => {
    let res: any = []
    data.forEach(i => {
        let obj: any = {}
        let mockData = formatFieldType(i)
        obj[i.fieldName] = mockData
        res.push(obj)
    })
    //一条数据
    let row = res.reduce((acc, curr) => {
        return Object.assign(acc, curr);
    }, {});

    return row
}

/**
 * 格式化字段类型
 * 例如：将fileType = int、minlength = n,maxlength = m 则映射为"@integer(n, m)",
 * 
    {"label": "Boolean","value": 0}, 
    {"label": "Date","value": 1},
    {"label": "Function","value": 2},
    {"label": "NaN","value": 3},
    {"label": "Number","value": 4},
    {"label": "Float","value": 5},
    {"label": "Integer","value": 6},
    {"label": "RegExp","value": 7},
    {"label": "String","value": 8},
    {"label": "Undefined","value": 9},
    {"label": "Null","value": 10}
 */
const formatFieldType = (fileProp: any) => {
    let { fieldName, fieldType, fieldDesc, fieldMinLength, fieldMaxLength } = fileProp
    let min = fieldMinLength || 2
    let max = fieldMaxLength || 4
    const fieldMap = {
        4: Mock.Random.integer(min, max),
        // 2: Mock.mock(`@cparagraph(${min},${max})`), //字符串
        8: Mock.Random.cname(min, max), //字符串
        0: Mock.Random.boolean(),
    }
    // console.log(fieldMap[fieldType], 'fieldMap[fieldType]')
    return fieldMap[fieldType]
}
export { Mock, createData } 