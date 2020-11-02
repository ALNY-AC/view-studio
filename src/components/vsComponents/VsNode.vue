
<template>
  <div :class="['vs-node',{'pre':preId==node.id}]">
    <div class="pre-label">{{node.name}}</div>
    <div class="vs-node-body">
      <component v-show="comp" :ref="'comp'+node.id" :is="comp" :node="node"></component>
    </div>
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
    },
    preNode: {
      type: Object,
      default: null
    }
  },
  computed: {
    preId() {
      if (this.preNode) {
        return this.preNode.id;
      } else {
        return '';
      }
    }
  },
  data() {
    return {
      comp: null,
    }
  },
  watch: {
    'node.components': {
      handler(val) {
        this.handler();
      },
      immediate: true,
    }
  },
  methods: {
    handler() {
      let vnode = this.node.queryComponent(vs.VSVNode);
      if (vnode) {
        let comp = vnode.require();
        this.comp = comp;
        this.$nextTick(() => {
          vnode.vm = this.$refs['comp' + this.node.id];
          vnode.mounted();
        })
      } else {
        setTimeout(() => {
          this.comp = null;
        }, 10);
      }
    }
  },
  mounted() {
  }
}
</script>
<style lang="scss" scoped>
.vs-node {
  display: block;
  position: relative;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  .vs-node-body {
    overflow: hidden;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
  }
  .pre-label {
    position: absolute;
    bottom: 100%;
    left: 0;
    background-color: rgb(193, 193, 193);
    padding: 5px 8px;
    line-height: 1;
    font-size: 12px;
    color: #333;
    display: none;
  }
  &:hover {
    outline: 1px solid rgb(255, 159, 44);
    .pre-label {
      display: block;
      background-color: rgb(255, 159, 44);
    }
  }
  &.pre {
    outline: 1px solid rgb(193, 193, 193);
    .pre-label {
      display: block;
    }
  }
}
</style>