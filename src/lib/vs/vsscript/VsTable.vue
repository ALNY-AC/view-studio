<template>
  <div>
    <h1>{{count}}</h1>
    <el-button @click="list=[]">清空</el-button>
    <el-table :data="list">
      <el-table-column prop="id"></el-table-column>
      <el-table-column prop="id"></el-table-column>
      <el-table-column prop="id"></el-table-column>
      <el-table-column prop="id"></el-table-column>
      <el-table-column prop="id"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'VsTable',
  props: {},
  data() {
    return {
      list: [{ id: -1 }, { id: 0 }],
      count: 1
    };
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.vs-table {
  width: 100%;
  height: 100%;
  display: block;
}
</style>