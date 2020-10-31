
<template>
  <div ref="chart" class="vs-chart"></div>
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
      chart: null,
    };
  },
  mounted() {

  }
}
</script>

<style lang="scss" scoped>
.vs-chart {
  width: 100%;
  height: 100%;
  display: block;
}
</style>