<template>
  <div id="projectList">
    <div class="project-list">
      <el-row :gutter="50">
        <el-col :span="8">
          <div class="project-card plus" @click="add()">
            <i class="el-icon-plus"></i>
          </div>
        </el-col>
        <el-col :span="8" v-for="item in list" :key="item.id">
          <div
            class="project-card"
            @click="$router.push(`/studio/workspace?id=${item.id}`);"
          >{{item.name}}</div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
export default {
  layout: 'root',
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.update();
    },
    async update() {
      const res = await this.$http.post('/vs/list');
      this.list = res.data;
    },
    async add() {
      const res = await this.$http.post('/vs/save');
      this.$router.push(`/studio/workspace?id=${res.data}`, { name: '新项目', });
    }
  }
}
</script>
<style lang="scss" scoped>
#projectList {
  background-color: rgb(66, 66, 66);
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
  // overflow: hidden;
  overflow: auto;
  position: relative;
  box-sizing: border-box;
  .project-list {
    width: 1000px;
    margin: 0 auto;
  }
  .project-card {
    box-sizing: border-box;
    background-color: rgb(89, 89, 89);
    width: 100%;
    height: 200px;
    margin-bottom: 50px;
    border-radius: 5px;
    transition: all 0.2s;
    cursor: pointer;
    border: 1px solid rgb(89, 89, 89);

    font-size: 30px;
    color: rgb(216, 216, 216);
    display: flex;
    align-items: center;
    justify-content: center;

    &.plus {
      font-size: 50px;
      // color: rgb(216, 216, 216);
      // display: flex;
      // align-items: center;
      // justify-content: center;
    }
    &:hover {
      box-shadow: 1px 1px 10px 10px rgba($color: #000000, $alpha: 0.1);
      border: 1px solid rgb(255, 159, 44);
    }
  }
}
</style>