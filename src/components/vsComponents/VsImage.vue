<template>
  <div v-if="comp">
    <img class="vs-image" :src="comp.src" alt />
    {{comp.src}}
  </div>
</template>
<script>
export default {
  name: 'VsImage',
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
    };
  },
  computed: {
    comp() {
      let comp = this.node.queryComponent('Image');
      console.warn(comp);
      return comp;
    }
  },
  methods: {

  }
}
</script>
<style lang="scss" scoped>
.vs-image {
  width: 100%;
  height: 100%;
  display: block;
}
</style>