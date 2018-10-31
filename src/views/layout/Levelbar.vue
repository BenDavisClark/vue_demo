<template>
  <el-breadcrumb class="app-levelbar" separator="/">
    <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path">
      <router-link v-if='item.redirect==="/index" ||item.redirect==="/dashboard"' :to="item.redirect||item.path"></router-link>
      <span v-else='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{item.name}}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  methods: {
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
   /*   var lastOne = matched[matched.length - 1]
      var path = lastOne.path
      var name = lastOne.name
      if (this._.endsWith(path, 'Detail')) {
        var newpath = path.substring(0,path.length-6)
        var newname = name.substring(0,name.length - 2)
        matched.splice(-1, 0, { name: newname + '管理', path: newpath})
        if(!this.$route.query.isEdit){
          matched.splice(-1, 1, { name: newname + '添加', path: 'test'})
        }
      }*/
      const first = matched[0]
      if (first && (first.name !== '首页'|| first.path !== '') && first.name!=='总览') {
        matched = [{ name: '首页', path: '/' }].concat(matched)
      }
      this.levelList = matched
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.app-levelbar.el-breadcrumb {
  font-size: 14px;
  line-height:42px;
  border-bottom:1px solid #e7ecf1;
  padding-left: 10px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
