<template>
  <div class="config-index">
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
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, watchEffect } from "vue";
  import { Delete, Search } from "@element-plus/icons-vue";
  import axios from "axios";
  import { TableForm } from "@/components/tableForm";
  import type { ITableTitleList } from "@/components/tableForm";
  import { ITableField, EParamsType } from "../type.ts";
  import { createData } from "@/mock";
  import { ElMessage } from "element-plus";
  //引入$bus对象
  import mitt, { Emitter } from "mitt";
  const $bus: Emitter = mitt();

  /**props */
  const props = defineProps({
    tableData: {
      type: Array,
      default: () => [],
    },

    formData: {
      type: Object,
      default: () => {},
    },
  });

  /**向父组件传值 */
  const emit = defineEmits(["getInterfaceData"]);

  //表单数据
  const tableFormData = reactive({ tableData: [] as any });

  //配置项表单
  const formData = reactive(props.formData);
  // 表格数据
  const tableData = props.tableData;
  tableFormData.tableData = tableData;
  //折叠面板
  const activeName = ref("1");

  //创建接口
  const handleClickAddInterface = async () => {
    //只取字段名不为空的
    let data = tableData.filter((i: any) => i.fieldName.length > 0);
    console.log(data, "生成数据");
    createData("/list", "get", data, formData.mockNum);
    const d = await axios.get("/list");
    console.log(d, "d");
    emit("getInterfaceData", d.data);
    $bus.emit("interfaceData", { interfaceData: d.data });
    console.log($bus, "bus");
    if (!formData.isRandomData) {
      formData.params = JSON.stringify(d.data);
      const result = await createInterface(formData);
      ElMessage.success(result.msg);
    }
  };

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

  //下拉框类型的值
  let selectItems = [];
  for (let i in EParamsType) {
    let obj = { label: i, value: EParamsType[i] };
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

  /**行操作 下拉框*/
  const handleChange = (
    scope: any,
    item: object,
    $event: any,
    type: string
  ) => {
    console.log(scope, item, $event, type, "父组件  操作列下拉框");
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
      let rowObj: any = { fieldName: "", fieldType: "string", fieldDesc: "" };
      tableData.push(rowObj);
    }
  };

  const createInterface = async (params: any) => {
    const data = await axios.post(
      "http://localhost:3000/interface/createInterface",
      params
    );
    console.log(data.data, "init");
    return data.data;
  };
</script>

<style lang="scss" scoped>
  .el-icon {
    cursor: pointer;
  }

  .default-table-data,
  .table-form {
    margin: 12px;
  }
</style>
