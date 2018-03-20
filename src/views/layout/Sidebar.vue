<template>
  <div>
    <logo></logo>
    <el-menu mode="vertical" background-color="#364150" text-color="#fff" active-text-color="#ffd04b" :default-active="$route.path">
      <sidebar-item :routes='permission_routers'></sidebar-item>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import Logo from './Logo'
export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
    // 只使用本地router配置文件中的router
    // routes() {
    //   return this.$router.options.routes
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
  border-right: none;
  overflow-x: hidden;
}
</style>
