<template>
  <div class="draggable" style="padding: 20px">
    <el-table row-key="id" :data="tableData" style="width: 100%">
      <el-table-column
        label="序号"
        type="index"
        align="center"
        width="60"
      ></el-table-column>
      <el-table-column
        v-for="(item, index) in state.oldList"
        :key="`col_${index}`"
        :prop="state.newList[index].fieldName"
        :label="item.fieldDesc ? item.fieldDesc : item.fieldName"
        align="center"
      >
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
  import Sortable from "sortablejs";
  import { reactive, onMounted } from "vue";

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
  });

  const state = reactive({
    oldList: [],
    newList: [],
  });
  // 行拖拽
  const rowDrop = function () {
    // 要拖拽元素的父容器
    const tbody = document.querySelector(
      ".draggable .el-table__body-wrapper tbody"
    );
    Sortable.create(tbody, {
      //  可被拖拽的子元素
      draggable: ".draggable .el-table__row",
      onEnd({ newIndex, oldIndex }) {
        const currRow = props.tableData.splice(oldIndex, 1)[0];
        props.tableData.splice(newIndex, 0, currRow);
      },
    });
  };
  // 列拖拽
  const columnDrop = function () {
    const wrapperTr = document.querySelector(
      ".draggable .el-table__header-wrapper tr"
    );
    Sortable.create(wrapperTr, {
      animation: 180,
      delay: 0,
      onEnd: (evt) => {
        const oldItem = state.newList[evt.oldIndex];
        state.newList.splice(evt.oldIndex, 1);
        state.newList.splice(evt.newIndex, 0, oldItem);
      },
    });
  };
  onMounted(() => {
    state.oldList = JSON.parse(JSON.stringify(props.tableHeaderTitle));
    state.newList = JSON.parse(JSON.stringify(props.tableHeaderTitle));
    columnDrop();
    rowDrop();
  });
</script>
