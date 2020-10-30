<template>
  <div>
    <h1>{{title}}</h1>
    <el-input v-model="time"></el-input>
    <el-button @click="query()">查询</el-button>
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
      title: '',
      time: '2020',
    };
  },
  methods: {
    query() {
      console.warn('掉接口');
    }
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