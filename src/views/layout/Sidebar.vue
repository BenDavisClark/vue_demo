<template>
  <el-menu mode="vertical" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" :default-active="$route.path">
    <sidebar-item :routes='permission_routers'></sidebar-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'permission_routers'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-menu {
  min-height: 100%;
  overflow-x: hidden;
}
</style>
