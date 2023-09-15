<template>
  <div class="show-data-index">
    <el-button type="primary" @click="handleClickGenerrateData"
      >生成数据</el-button
    >
    <default-table
      class="default-table-data"
      :tableData="interfaceData"
      :tableHeaderTitle="tableHeaderTitle"
    ></default-table>
  </div>
</template>

<script setup lang="ts">
  import { ref, reactive, onMounted, nextTick } from "vue";
  import axios from "axios";
  import { createData } from "@/mock";
  import DefaultTable from "@/components/table";
  //引入$bus对象
  import mitt, { Emitter } from "mitt";
  const $bus: Emitter = new mitt();
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

    // interfaceData: {
    //   type: Array,
    //   default: () => [],
    // },
  });

  // 表格数据
  const tableHeaderTitle = reactive(props.tableData);
  //表单参数
  const formData = reactive(props.formData);
  //生成的接口数据
  let interfaceData = reactive([]);

  /**生成数据 */
  //生成后的数据data
  const generateTableData = reactive([]);
  const handleClickGenerrateData = async () => {
    $bus.on("interfaceData", (data: any) => {
      console.log(data, "interfaceData");
      interfaceData = data;
      console.log(data);
    });
    // //只取字段名不为空的
    // let data = tableHeaderTitle.filter((i: any) => i.fieldName.length > 0);
    // createData("/list", "get", data, formData.mockNum);
    // const d = await axios.get("/list");
    // if (formData.isRandomData) {
    //   generateTableData = d.data;
    // } else {
    //   formData.params = JSON.stringify(d.data);
    //   const result = await createInterface(formData);
    //   generateTableData = d.data;
    //   console.log(result, "result");
    // }
  };

  onMounted(() => {
    $bus.on("interfaceData", (data: any) => {
      console.log(data, "interfaceData");
      interfaceData = data;
      console.log(data);
    });
  });

  const createInterface = async (params: any) => {
    const data = await axios.post(
      "http://localhost:3000/interface/createInterface",
      params
    );
    console.log(data.data, "init");
    return data.data;
  };
</script>

<style lang="scss" scoped></style>
