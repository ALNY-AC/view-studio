<template>
  <el-button :type="type" v-if="ComponentScript" @click="ComponentScript.eventFunction()">{{title}}</el-button>
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
      title: '',
      model: '',
      ComponentScript: null,
      type: 'default'
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
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
</style>