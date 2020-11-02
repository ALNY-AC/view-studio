<template>
  <div class="vs-label" :style="style" v-html="text"></div>
</template>
<script>
export default {
  name: 'VsLabel',
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      Label: null,
    };
  },
  methods: {
  },
  computed: {
    text() {
      if (!this.Label) return {};
      return this.Label.text.replace(/[\r|\n]/gim, '<br>');

    },
    style() {
      if (!this.Label) return {};
      let h = {
        '左对齐': 'flex-start',
        '居中': 'center',
        '右对齐': 'flex-end',
      }
      let v = {
        '顶部': 'flex-start',
        '居中': 'center',
        '底部': 'flex-end',
      }
      let a = {
        '左对齐': 'left',
        '居中': 'center',
        '右对齐': 'right',
      }

      return {
        color: this.node.color,
        fontSize: this.Label.fontSize,
        textAlign: a[this.Label.align],
        alignItems: v[this.Label.alignItems],
        justifyContent: h[this.Label.justifyContent],
      }
    }
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.vs-label {
  width: 100%;
  height: 100%;
  display: flex;
}
</style>