<template>
  <div class="home-index">
    <el-card class="field-opreation">
      <table-form
        :formData="formData"
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
    </el-card>

    <el-card class="mock-data">
      <el-button type="primary" @click="handleClickGenerrateData"
        >生成数据</el-button
      >
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive } from "vue";
  import { Delete } from "@element-plus/icons-vue";
  import axios from "axios";
  import { TableForm } from "@/components/tableForm";
  import type { ITableTitleList } from "@/components/tableForm";
  import { ITableField } from "./type.ts";
  import { createData } from "@/mock";

  //表单数据
  const formData = reactive({ tableData: [] as any });

  // 表格数据
  const tableData = reactive<ITableField>([
    { fieldName: "name", fieldType: 2, fieldDesc: "姓名" },
    {
      fieldName: "age",
      fieldType: 1,
      fieldDesc: "年龄",
      fieldMinLength: 15,
      fieldMaxLength: 50,
    },
  ]);
  formData.tableData = tableData;

  /**表头行数据 */
  const tableHeaderTitle = ref<ITableTitleList>([
    {
      prop: "fieldName",
      label: "字段名",
      type: "input",
      minWidth: 100,
      options: {
        placeholder: "请输入英文字母字段名",
      },
    },
    {
      prop: "fieldType",
      label: "字段类型",
      type: "select",
      minWidth: 80,
      selectItems: [
        { label: "int", value: 1 },
        { label: "string", value: 2 },
        { label: "boolean", value: 3 },
        { label: "null", value: 4 },
        { label: "array", value: 5 },
        { label: "object", value: 6 },
      ],
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
      let rowObj: any = { fieldName: "", fieldType: null, fieldDesc: "" };
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
  /**生成数据 */
  const handleClickGenerrateData = async () => {
    //只取字段名不为空的
    let data = tableData.filter((i: any) => i.fieldName.length > 0);
    console.log(data, "生成数据");
    createData("/list", "get", data);
    const d = await axios.get("/list");
    console.log(d.data);
  };

  // const getList = async () => {
  //   test("/list", "get", { a: 1 });
  // };

  // getList();
</script>

<style lang="scss" scoped>
  .home-index {
    display: flex;
    height: 100%;
    .field-opreation,
    .mock-data {
      flex: 1;
    }
    .field-opreation {
      margin-right: 20px;
    }
  }

  .el-icon {
    cursor: pointer;
  }
</style>
