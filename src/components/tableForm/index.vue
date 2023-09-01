<template>
  <div class="table-form-index">
    <el-form ref="formData" :model="formData">
      <el-table ref="elTable" :data="formData[tableName]">
        <el-table-column
          type="index"
          fixed="left"
          width="60"
          label="序号"
          align="center"
          v-if="isShowIndex"
        ></el-table-column>
        <el-table-column
          v-for="item in tableHeaderTitle"
          :key="item.prop"
          :minWidth="item.minWidth"
          show-overflow-tooltip
          :label="item.label"
          align="center"
        >
          <template
            #header
            v-if="
              (item.rules && item.rules[0] && item.rules[0].required) ||
              item.isValidate ||
              item.prefix
            "
          >
            <div class="div-column">
              <span style="color: red; margin-right: 5px">*</span>
              <span>{{ item.label }}</span>
            </div>
          </template>
          <template v-slot="scope">
            <el-form-item
              :prop="tableName + '.' + scope.$index + '.' + item.prop"
              :rules="item.rules"
            >
              <template
                v-if="
                  item.rules &&
                  item.rules[0] &&
                  item.rules[0].required &&
                  item.prefix
                "
              >
                <span style="color: red; margin-right: 2px">*</span>
              </template>
              <!-- {{ scope.row[item.prop] }} -->

              <!--正常展示-->
              <!--文本-->
              <template v-if="item.type === 'text'">
                <span class="overflow-tooltip">{{ scope.row[item.prop] }}</span>
              </template>

              <!--input-->
              <template v-if="item.type === 'input'">
                <el-input
                  :disabled="disabled"
                  size="default"
                  @input="handleInput(scope, item, $event, 'input')"
                  v-model.trim="scope.row[item.prop]"
                  v-bind="item.options"
                  clearable
                ></el-input>
              </template>

              <template v-if="item.type === 'switch'">
                <el-switch
                  :disabled="disabled"
                  v-model="scope.row[item.prop]"
                  v-bind="item.options"
                ></el-switch>
              </template>

              <template v-if="item.type === 'date'">
                <el-date-picker
                  :disabled="disabled"
                  clearable
                  type="date"
                  size="default"
                  v-model="scope.row[item.prop]"
                  :value-format="
                    item.valueFormat ? item.valueFormat : 'yyyy-MM-dd'
                  "
                  v-bind="item.options"
                ></el-date-picker>
              </template>

              <template v-if="item.type === 'slot'">
                <slot
                  :name="item.slotName"
                  :scope="scope.row"
                  :rowIndex="scope.$index"
                ></slot>
              </template>

              <!--input number-->
              <template v-if="item.type === 'inputNumber'">
                <el-input-number
                  clearable
                  :disabled="disabled"
                  size="default"
                  controls-position="right"
                  @change="handleInput(scope, item, $event, 'inputNumber')"
                  v-model.trim="scope.row[item.prop]"
                  v-bind="item.options"
                ></el-input-number>
              </template>

              <template v-if="item.type === 'number'">
                <el-input
                  :disabled="disabled"
                  type="number"
                  size="default"
                  @input="handleInput(scope, item, $event, 'number')"
                  v-model.number="scope.row[item.prop]"
                ></el-input>
              </template>
              <!--select-->
              <template v-if="item.type === 'select'">
                <el-select
                  :disabled="disabled || item.disabled"
                  clearable
                  size="default"
                  v-model="scope.row[item.prop]"
                  @change="handleChange(scope, item, $event, 'select')"
                >
                  <el-option
                    v-for="selectItem in item.selectItems"
                    :value="selectItem.value"
                    :label="
                      selectItem.defaultLabel
                        ? selectItem.defaultLabel
                        : selectItem.label
                    "
                    :key="selectItem.value"
                  ></el-option>
                </el-select>
              </template>
            </el-form-item>
          </template>
        </el-table-column>
        <el-table-column
          v-if="isShowActionBtn"
          :width="actionWidth ? actionWidth : 80"
          fixed="right"
          align="center"
          label="操作"
        >
          <template v-slot="scope">
            <slot name="action" :scope="scope"></slot>
            <el-icon
              v-if="isShowActionDelete"
              title="delete"
              @click="handleDeleteCurrentRow(scope)"
              ><Delete
            /></el-icon>
          </template>
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script setup lang="ts">
  import { ITableTitleList } from "./type";
  import { Delete } from "@element-plus/icons-vue";
  const props = defineProps({
    /**表单名 */
    formData: {
      type: Object,
      default: () => {},
    },
    /**表格数据名 */
    tableName: {
      type: String,
      default: "tableData",
    },
    /**数据 */
    tableData: {
      type: Array,
      default: () => [],
    },
    /**表头相关信息*/
    tableHeaderTitle: {
      type: Array<ITableTitleList>,
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
    /**是否展示操作列的删除按钮 */
    isShowActionDelete: {
      type: Boolean,
      default: true,
    },
    /**操作列宽度 */
    actionWidth: {
      type: Number,
      default: 80,
    },
    /**不可编辑 默认可编辑 */
    disabled: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits([
    "handleDeleteCurrentRow", //删除当强行
    "handleChange", //行 下拉框触发事件
    "handleInput", //行 其他触发事件
  ]);

  //行 下拉框触发事件
  const handleChange = (scope: any, item: any, $event: any, type: string) => {
    console.log(scope, item, $event, type, "子组件行下拉框触发事件");
    emit("handleChange", scope, item, $event, type);
  };

  //行 其他触发事件
  const handleInput = (scope: any, item: any, $event: any, type: string) => {
    console.log(scope, item, $event, type, "子组件行 其他触发事件");
    emit("handleInput", scope, item, $event, type);
  };

  //删除当前行
  const handleDeleteCurrentRow = (scope: any) => {
    let { $index } = scope;
    let { formData, tableName } = props;
    formData[tableName].splice($index, 1);
    emit("handleDeleteCurrentRow", scope);

    console.log(scope, "子组件删除当前行");
  };
</script>

<style lang="scss" scoped>
  .el-icon {
    cursor: pointer;
  }

  ::v-deep .el-form-item {
    margin-bottom: 4px;
  }
</style>
