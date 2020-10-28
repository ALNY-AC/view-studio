<template>
  <el-menu router class="o-menu" background-color="#fff" text-color="#333">
    <el-submenu index="draggable">
      <template slot="title">
        <span>draggable</span>
      </template>
      <el-menu-item index="/studio/workspace" :route="{path:'/studio/workspace'}">可视化</el-menu-item>
    </el-submenu>
  </el-menu>
</template>
<script src="./OMenu.js"></script>
<style lang="scss" scoped>
@import "OMenu.scss";
</style>