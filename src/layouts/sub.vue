<template>
  <div class="sub">
    <nuxt class="nuxt" />
  </div>
</template>

<script>
export default {
  middleware: "root",
  data() {
    return {};
  },
  mounted() { },
  methods: {},
  watch: {
    $route(to) { },
    active(v) { }
  }
};
</script>
<style lang="scss" scoped>
</style>
