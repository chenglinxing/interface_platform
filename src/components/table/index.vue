<template>
  <div class="default-talbe">
    <el-table :data="tableData">
      <el-table-column
        type="index"
        align="center"
        label="序号"
        width="60"
      ></el-table-column>
      <el-table-column
        v-for="item in tableHeaderTitle"
        :prop="item.fieldName"
        :label="item.fieldDesc ? item.fieldDesc : item.fieldName"
        align="center"
      ></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  /**数据 */
  tableData: {
    type: Array,
    default: () => [],
  },
  /**表头相关信息*/
  tableHeaderTitle: {
    type: Array,
    default: () => [],
  },
  /**是否显示索引列*/
  isShowIndex: {
    type: Boolean,
    default: true,
  },
  /**是否展示操作列 */
  isShowActionBtn: {
    type: Boolean,
    default: true,
  },
});
</script>
<style scoped lang="scss"></style>
