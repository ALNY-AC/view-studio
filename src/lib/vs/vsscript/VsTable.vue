<template>
  <div class="vs-table" :style="style">
    <!-- <h1>{{title}}</h1>
    <el-input v-model="time"></el-input>
    <el-button @click="list=[]">清空</el-button>

    <el-select v-model="query.opt" v-if="table" placeholder="请选择">
      <el-option v-for="item in table.opt" :key="item" :label="item" :value="item"></el-option>
    </el-select>-->
    <el-button @click="data=[]">清空</el-button>
    <el-table :data="data">
      <el-table-column prop="id"></el-table-column>
      <el-table-column prop="name"></el-table-column>
      <el-table-column prop="add_time"></el-table-column>
      <el-table-column prop="edit_time"></el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  name: 'VsTable',
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      list: [{ id: -1 }, { id: 0 }],
      data: [],
      title: '',
      time: '2020',
      table: null,
      query: {
        opt: '',
      }
    };
  },
  methods: {
  },
  computed: {
    style() {
      return {
        color: this.node.color
      }
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
  overflow: auto;
}
</style>