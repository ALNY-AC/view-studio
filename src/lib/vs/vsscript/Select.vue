<template>
  <el-select v-model="model" :placeholder="placeholder">
    <el-option v-for="item in my_options" :key="item.value" :label="item.label" :value="item.value"></el-option>
  </el-select>
</template>
<script>
export default {
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      id: this.$getRandom(),
      options: '',//{value:'',label:''}
      model: '',
      placeholder: '',
      ComponentScript: null,
    };
  },
  computed: {
    my_options() {
      try {
        return JSON.parse(this.options.replace(/[\r|\n]/gim, ''));
      } catch (error) {
        return [];
      }
    }
  },
  watch: {
    model() {
      this.ComponentScript.model = this.model;
      this.ComponentScript.eventFunction();
    },
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
</style>