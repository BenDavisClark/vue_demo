<template>
  <div class="icons-container">
    <div class="icons-wrapper">
      <div v-for="item of iconsMap" :key="item" >
        <el-tooltip placement="top">
          <div class="icon-item">
            <svg-icon class="disabled" :icon-class="item" />
            <span>{{item}}</span>
          </div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
  import icons from './generateIconsView'

  export default {
    name: 'icons',
    data() {
      return {
        iconsMap: []
      }
    },
    mounted() {
      const iconsMap = icons.state.iconsMap.map((i) => {
        return i.default.id.split('-')[1]
      })
      this.iconsMap = iconsMap
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .svg-icon{
    width: 1em;
    height: 1em;
  }
  .icons-container {
    margin: 10px 20px 0;
    overflow: hidden;
    .icons-wrapper {
      margin: 0 auto;
    }
    .icon-item {
      margin: 20px;
      height: 110px;
      text-align: center;
      width: 110px;
      float: left;
      font-size: 30px;
      color: #24292e;
      cursor: pointer;
    }
    span {
      display: block;
      font-size: 24px;
      margin-top: 10px;
    }
    .disabled{
      pointer-events: none;
    }
  }
</style>
