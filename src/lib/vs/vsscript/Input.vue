<template>
  <el-input
    v-model="model"
    :placeholder="placeholder"
    @keydown.enter.native="ComponentScript.eventFunction()"
    v-if="ComponentScript"
  ></el-input>
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
      valueFormat: '',
      model: '',
      placeholder: '',
      ComponentScript: null,
    };
  },
  watch: {
    model() {
      this.ComponentScript.model = this.model;
    }
  },
  computed: {
  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
</style>