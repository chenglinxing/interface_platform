<template>
  <div class="home-index">
    <el-card class="field-opreation">
      <InterfaceConfig
        :tableData="tableData"
        :formData="formData"
        @getInterfaceData="getInterfaceData"
      />
    </el-card>

    <el-card class="mock-data">
      {{ interfaceData }}
      <InterfaceShowData
        :tableData="tableData"
        :formData="formData"
        :interfaceData="interfaceData"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
  import { reactive,nextTick } from "vue";
  import InterfaceConfig from "./components/config.vue";
  import InterfaceShowData from "./components/showData.vue";

  /**初始化接口参数 */
  const tableData = reactive([
    { fieldName: "name", fieldType: "string", fieldDesc: "姓名" },
    {
      fieldName: "age",
      fieldType: "number",
      fieldDesc: "年龄",
      fieldMinLength: 15,
      fieldMaxLength: 50,
    },
  ]);
  /**初始化表单数据 */
  const formData = reactive({
    isRandomData: true, //是否前端随机
    url: "/user/getUserInfo", //接口路径
    method: 1, //接口类型
    params: "", //参数
    mockNum: 10, //模拟数据条数
    userName: localStorage.getItem("userName") || "admin",
  });

  /**生成的接口数据 */
  let interfaceData = reactive([]);

  /**子组件传入事件 */
const getInterfaceData = (data: any) => {
    console.log(data, interfaceData, "传入");
    nextTick(() => {
      interfaceData = data;
    });
    
  };
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
