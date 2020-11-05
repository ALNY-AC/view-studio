<template>
  <el-date-picker
    v-model="model"
    :value-format="valueFormat"
    type="date"
    :placeholder="placeholder"
    v-if="ComponentScript"
  ></el-date-picker>
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
      this.ComponentScript.eventFunction();
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