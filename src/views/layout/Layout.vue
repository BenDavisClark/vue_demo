<template>
  <div class="app-wrapper">
    <navbar></navbar>
    <div>
      <div class="sidebar-wrapper" :class="{thinerwrapper:!sidebar.opened}">
        <sidebar class="sidebar-container"></sidebar>
      </div>
      <div class="main-container" :class="{widercontainer:!sidebar.opened}">
        <app-main></app-main>
      </div>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from '@/views/layout'

export default {
  name: 'layout',
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
    @import "src/styles/mixin.scss";
    .app-wrapper {
        @include clearfix;
        position: relative;
        height: 100%;
        width: 100%;
        &.hideSidebar {
            .sidebar-wrapper {
                transform: translate(-134px, 0);
                .sidebar-container {
                    transform: translate(126px, 0);
                }
            }
            .main-container {
                margin-left: 46px;
            }
        }
        .sidebar-wrapper {
            width: 180px;
            position: fixed;
            top: 40px;
            bottom: 0;
            left: 0;
            z-index: 1001;
            overflow: hidden;
        }
        .thinerwrapper{
            width: 46px;
            overflow: hidden;
        }
        .sidebar-container {
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: -17px;
            overflow-y: scroll;
        }
        .main-container {
            min-height: 100%;
            transition: all .28s ease-out;
            margin-left: 180px;
        }
        .widercontainer{
            margin-left: 46px;
        }
    }
</style>
