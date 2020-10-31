
<template>
  <div class="vs-image" ref="image" :id="id" :style="style"></div>
</template>
<script>
export default {
  name: 'VsCharts',
  props: {
    node: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      id: this.$getRandom(),
      src: '',
      image: null,
    };
  },
  computed: {
    style() {
      if (!this.image) return {};
      let alignMap = {
        '填充': '100% 100%',
        '适应': 'cover',
        '原图': 'contain',
      };
      let style = {
        backgroundImage: `url(${this.image.src})`,
      }
      if (this.image.align == '填充') {
        style.backgroundSize = '100% 100%';
      }

      if (this.image.align == '适应') {
        style.backgroundSize = 'cover';
        style.backgroundPosition = 'center center';
      }

      if (this.image.align == '原图') {
        
      }

      if (this.image.repeat == '不重复') {
        style.backgroundRepeat = 'no-repeat';
      }

      if (this.image.repeat == '重复') {
        style.backgroundRepeat = 'repeat';
      }

      if (this.image.repeat == '水平重复') {
        style.backgroundRepeat = 'repeat-x';
      }

      if (this.image.repeat == '垂直重复') {
        style.backgroundRepeat = 'repeat-y';
      }

      console.warn(this.image);
      console.warn(style);
      return style;
    }
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>
.vs-image {
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  // background-repeat: ;
}
</style>