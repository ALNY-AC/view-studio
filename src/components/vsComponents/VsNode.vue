
<template>
  <div class="vs-node">
    <component v-show="comp" :ref="'comp'+node.id" :is="comp" :node="node"></component>
  </div>
</template>
<script>
import vs from '../../lib/vs/vs'
export default {
  name: 'VsNode',
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      comp: null,
    }
  },
  watch: {
    'node.components'(val) {
      if (val.length > 0) {
        this.handler();
      }
    }
  },
  methods: {
    handler() {
      let vnode = this.node.queryComponent(vs.VNode);
      if (vnode) {
        let comp = vnode.require();
        this.comp = comp;
        this.$nextTick(() => {
          vnode.vm = this.$refs['comp' + this.node.id];
        })
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.vs-node {
  border: solid 2px #ddd;
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
}
</style>