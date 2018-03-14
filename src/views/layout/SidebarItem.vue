<template>
  <div>
    <template v-for="item in routes">
      <router-link v-if="!item.children" :to="item.path" :key="item.name">
        <el-menu-item :index="item.path">
          <span>{{item.name}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.name" :key="item.name">
        <template slot="title">
          <span>{{item.name}}</span>
        </template>

        <template v-for="child in item.children">
          <router-link :to="item.path+'/'+child.path" :key="child.name">
            <el-menu-item :index="item.path+'/'+child.path">
              <span>{{child.name}}</span>
            </el-menu-item>
          </router-link>
        </template>
      </el-submenu>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SidebarItem',
  props: {
    routes: {
      type: Array
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.svg-icon {
  margin-right: 10px;
}
.hideSidebar .menu-indent{
  display: block;
  text-indent: 10px;
}
</style>

