<template>
  <div class="layout-index">
    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
      <el-footer>Footer</el-footer>
    </el-container>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.layout-index{
  height: 100%;
  .el-main{
    height: 100%;
  }
}
</style>
