<template>
  <div>
    <toggle-side></toggle-side>
    <el-menu mode="vertical" class="sidemenu" :unique-opened=true background-color="#364150" text-color="#fff" :collapse="isCollapse" active-text-color="#fff" :default-active="$route.path">
      <template v-for="item in permission_routers">
        <router-link v-if="!item.hidden&&item.noDropdown&&item.children.length>0" :to="item.path+'/'+item.children[0].path" :key="item.name">
          <el-menu-item :index="item.path+'/'+item.children[0].path">
            <icon-svg :iconClass="item.icon"></icon-svg>
            <span slot="title">{{item.name}}</span>
          </el-menu-item>
        </router-link>

        <el-submenu v-if="!item.noDropdown&&!item.hidden" :index="item.path+'/'+item.children[0].path" :key="item.name">
          <template slot="title">
            <icon-svg :iconClass="item.icon"></icon-svg>
            <span slot="title">{{item.name}}</span>
          </template>
          <template v-for="child in item.children">
            <router-link :to="item.path+'/'+child.path" :key="child.name">
              <el-menu-item :index="item.path+'/'+child.path">
                <span slot="title">{{child.name}}</span>
              </el-menu-item>
            </router-link>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ToggleSide from './ToggleSide'
import IconSvg from '@/components/Icon/index'
export default {
  components: { IconSvg, ToggleSide },
  data () {
    return {
      // isCollapse: !this.$store.state.app.sidebar
    }
  },
  computed: {
    ...mapGetters(['permission_routers']),
    isCollapse () {
      return !this.$store.state.app.sidebar.opened
    }
    // 只使用本地router配置文件中的router
    // routes () {
    //   return this.$router.options.routes
    // }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.sidemenu {
  transition: none !important;
}
.el-menu {
  min-height: 100%;
  border-right: none;
  overflow-x: hidden;
}

// 菜单收缩
.el-menu--collapse {
  width: 46px;
  .el-menu-item .el-tooltip {
    padding: 0 11px !important;
  }
}

// 浮动菜单
.el-menu--popup .el-menu-item.is-active {
  background: #3e4b5c !important;
}

// 菜单展开
.el-menu--inline {
  .el-menu-item {
    padding-left: 45px !important;
  }
}

.el-menu-item.is-active {
  background: #36c6d3 !important;
}

.el-submenu.is-active {
  .el-submenu__title {
    background: #36c6d3 !important;
  }
  .el-menu-item.is-active {
    background: #3e4b5c !important;
  }
}

.el-menu-item,
.el-submenu__title {
  padding-left: 11px !important;
  margin-bottom: 5px;
  margin-top: 5px;
  height: 46px;
  line-height: 46px;
}
.el-submenu .el-menu-item {
  height: 40px;
  line-height: 40px;
}
</style>
