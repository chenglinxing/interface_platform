<template>
  <div class="home-index">
    <el-card class="field-opreation">
      <el-form :model="formData" class="demo-form-inline" label-suffix="：">
        <el-form-item>
          <el-switch
            v-model="formData.isRandomData"
            class="mb-2"
            active-text="前端生成数据"
            inactive-text="后端生成接口"
          />
        </el-form-item>
        <el-form-item
          label="请求方式"
          prop="method"
          :rules="[{ required: true, message: '请选择请求方式' }]"
        >
          <el-input
            v-model="formData.url"
            clearable
            placeholder="请输入URL"
            class="input-with-select"
          >
            <template #prepend>
              <el-select
                v-model="formData.method"
                placeholder="Select"
                style="width: 80px"
                @change="handleChangeMethod"
              >
                <el-option label="GET" :value="1" />
                <el-option label="POST" :value="2" />
              </el-select>
            </template>
            <template #append>
              <el-button
                style="width: 120px"
                :icon="Search"
                type="primary"
                @click="handleClickAddInterface"
                >创建接口</el-button
              >
            </template>
          </el-input>
        </el-form-item>

        <el-form-item
          label="生成条数"
          prop="mockNum"
          :rules="[{ required: true, message: '请输入条数' }]"
        >
          <el-input-number
            :min="1"
            :max="100"
            controls-position="right"
            v-model="formData.mockNum"
            placeholder="请输入条数"
            clearable
          />
        </el-form-item>
      </el-form>

      <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="接口返回参数配置" name="1">
          <table-form
            class="table-form"
            :formData="tableFormData"
            :tableData="tableData"
            tableName="tableData"
            :tableHeaderTitle="tableHeaderTitle"
            :isShowActionDelete="false"
            @handleInput="handleInput"
            @handleChange="handleChange"
          >
            <template #action="scope">
              <el-icon
                v-if="tableData.length > 1"
                title="delete"
                @click="handleDeleteCurrentRow(scope.scope)"
                ><Delete
              /></el-icon>
            </template>
          </table-form>
        </el-collapse-item>
      </el-collapse>
    </el-card>

    <el-card class="mock-data">
      <el-button type="primary" @click="handleClickGenerrateData"
        >生成数据</el-button
      >
      <default-table
        class="default-table-data"
        :tableData="generateTableData"
        :tableHeaderTitle="tableData"
      ></default-table>

      <!-- <drag-table :tableData="generateTableData" :tableHeaderTitle="tableData">
      </drag-table> -->
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watchEffect } from "vue";
  import { Delete, Search } from "@element-plus/icons-vue";
  import axios from "axios";
  import { TableForm } from "@/components/tableForm";
  import DefaultTable from "@/components/table";
  import DragTable from "@/components/dragTable/index.vue";
  import type { ITableTitleList } from "@/components/tableForm";
  import { ITableField, EParamsType } from "./type.ts";
  import { isValidateUrl, removeSpaces } from "@/utils";
  import { createData } from "@/mock";
  import { ElMessage } from "element-plus";

  //折叠面板
  const activeName = ref("1");

  //是否随机数据
  const isRandomData = ref(true);
  //配置项表单
  const formData = reactive({
    isRandomData: true, //是否前端随机
    url: "/user/getUserInfo", //接口路径
    method: 1, //接口类型
    params: "", //参数
    mockNum: 10, //模拟数据条数
    userName: localStorage.getItem("userName") || "admin",
  });

  //表单数据
  const tableFormData = reactive({ tableData: [] as any });

  // 表格数据
  const tableData = reactive<ITableField>([
    { fieldName: "name", fieldType: 8, fieldDesc: "姓名" },
    {
      fieldName: "age",
      fieldType: 4,
      fieldDesc: "年龄",
      fieldMinLength: 15,
      fieldMaxLength: 50,
    },
  ]);
  tableFormData.tableData = tableData;
  console.log(EParamsType, "EParamsType");

  //下拉框类型的值
  let selectItems = [];
  for (let i in EParamsType) {
    let obj = { label: i, value: Number(EParamsType[i]) };
    selectItems.push(obj);
  }
  console.log(selectItems, "selectItems");
  /**表头行数据 */
  const tableHeaderTitle = ref<ITableTitleList>([
    {
      prop: "fieldName",
      label: "字段名",
      type: "input",
      minWidth: 80,
      options: {
        placeholder: "请输入英文字母字段名",
      },
    },
    {
      prop: "fieldType",
      label: "字段类型",
      type: "select",
      minWidth: 60,
      selectItems,
      options: {
        placeholder: "请选择字段类型",
      },
    },
    {
      prop: "fieldDesc",
      label: "字段描述",
      type: "input",
      minWidth: 130,
    },
  ]);

  /**监听url */
  watchEffect(() => {
    let url = formData.url;
    if (url.length) {
      console.log(
        url,
        removeSpaces(url),
        isValidateUrl(url),
        isValidateUrl(removeSpaces(url)),
        "url"
      );
    }
  });

  /**选择方法 */
  const handleChangeMethod = (e: any) => {
    console.log(e, "e");
  };

  /**删除当前行 */
  const handleDeleteCurrentRow = (scope: any) => {
    console.log(scope, "handleDeleteCurrentRow父组件");
    let { $index, row } = scope;
    tableData.splice($index, 1);
  };
  /**行操作 */
  const handleInput = (scope: any, item: any, $event: any, type: string) => {
    let { $index } = scope;
    console.log(scope, item, $event, type, $index, "父组件  操作列");
    //当操作字段名的时候 添加一行，只有操作倒数第一行才会新增
    if (
      type == "input" &&
      item?.prop == "fieldName" &&
      $index + 1 == tableData.length
    ) {
      let rowObj: any = { fieldName: "", fieldType: 8, fieldDesc: "" };
      tableData.push(rowObj);
    }
  };

  /**行操作 下拉框*/
  const handleChange = (
    scope: any,
    item: object,
    $event: any,
    type: string
  ) => {
    console.log(scope, item, $event, type, "父组件  操作列下拉框");
  };

  ////////////////////////
  //创建接口
  const handleClickAddInterface = async () => {
    //只取字段名不为空的
    let data = tableData.filter((i: any) => i.fieldName.length > 0);
    console.log(data, "生成数据");
    createData("/list", "get", data, formData.mockNum);
    const d = await axios.get("/list");
    if (!formData.isRandomData) {
      formData.params = JSON.stringify(d.data);
      const result = await initData(formData);
      console.log(result, "result");
      ElMessage.success(result.msg);
    }
  };
  /**生成数据 */
  //生成后的数据data
  const generateTableData = ref([]);
  const handleClickGenerrateData = async () => {
    //只取字段名不为空的
    let data = tableData.filter((i: any) => i.fieldName.length > 0);
    console.log(data, "生成数据");
    createData("/list", "get", data, formData.mockNum);
    const d = await axios.get("/list");
    if (formData.isRandomData) {
      generateTableData.value = d.data;
    } else {
      formData.params = JSON.stringify(d.data);
      const result = await initData(formData);
      generateTableData.value = d.data;
      console.log(result, "result");
    }
  };

  //init
  const initData = async (params: any) => {
    // const data = await axios.post(
    //   "http://localhost:3000/interface/createInterface",
    //   params
    // );

    // console.log(data.data, "init");
    // return data.data;
  };

  // initData();
</script>

<style lang="scss" scoped>
  .home-index {
    display: flex;
    height: 100%;
    overflow: hidden;
    .field-opreation,
    .mock-data {
      flex: 1;
      overflow: auto;
    }
    .field-opreation {
      margin-right: 20px;
    }
  }

  .el-icon {
    cursor: pointer;
  }

  .default-table-data,
  .table-form {
    margin: 12px;
  }

  //   :deep(.el-table) {
  //     border-color: #ffffff !important;

  //     thead {
  //       color: #00468b !important;
  //     }

  //     &::before {
  //       height: 0 !important;
  //     }
  //   }

  // :deep(.el-table) {
  //   border-color: #ffffff !important;

  //   thead {
  //     color: #00468b !important;
  //   }

  //   &::before {
  //     height: 0 !important;
  //   }
  // }

  // :deep(.el-table__fixed) {
  //   &::before {
  //     background-color: #ffffff;
  //   }
  // }

  // :deep(.el-table--border::after) {
  //   background-color: #ffffff !important;
  // }

  // :deep(.el-table--border .el-table__cell,
  // .el-table__body-wrapper .el-table--border.is-scrolling-left ~ .el-table__fixed) {
  //   border-right: none !important;
  // }

  // :deep(.el-table__footer-wrapper tbody > tr > td:first-child) {
  //   color: #194786;
  //   font-weight: 500;
  // }

  // :deep(.el-table__body tr:hover > td) {
  //   background-color: #f5f7fa;
  // }
</style>
