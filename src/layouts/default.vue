<template>
  <div class="default">
    <div class="nav-box">
      <div class="logo-box">
        <div class="title">demo</div>
        <div class="sub-title">demo</div>
      </div>
      <!-- <o-menu></o-menu> -->
    </div>
    <div class="view-panel">
      <el-header height="50px">
        <el-button round @click="signOut">退出登录</el-button>
      </el-header>
      <!-- keep-alive  -->
      <nuxt class="view-box" />
    </div>
  </div>
</template>

<script>
export default {
  middleware: "auth",
  data() {
    return {};
  },
  mounted() { },
  methods: {
    signOut() {
      localStorage.clear();
      this.$store.commit("user/set", null);
      this.$store.commit("power/set", []);

      this.$router.replace("/login");
    },
  },
  computed: {
    userName() {
      if (this.$store.state.user.info) {
        return this.$store.state.user.info.name;
      } else {
        return null;
      }
    }
  },
  watch: {
    $route(to) { },
    active(v) { }
  }
};
</script>
<style lang="scss" scoped>
@import "default.scss";
</style>
