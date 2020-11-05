<template>
  <iframe :src="src" frameborder="0"></iframe>
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
      type: 'default',
      src: '',
    };
  },
  computed: {

  },
  mounted() {

  }
}
</script>
<style lang="scss" scoped>
iframe {
  width: 100%;
  height: 100%;
}
</style>