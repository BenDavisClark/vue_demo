<template>
  <div class="workplace-chart" :id="id" :style="nodeStyle" @dblclick="handleNodeDbclick">
    <i :class="[icon,type]" class="iconType"></i>
    <span>{{text}}</span>
    <div class="ep"></div>
    <span class="del" delete-all @click="handleNodeDel"><i class="el-icon-error" style="font-size: 16px;"></i></span>
  </div>
</template>
<script>
export default {
  name: "ChartNode",
  // props 验证
  props: {
    id: {
      type: String,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true
    },
    icon: {
      type: String
    },
    nodeStyle: {
      type: Object
    }
  },
  data() {
    return {};
  },
  mounted(){

  },
  methods: {
    handleNodeDbclick() {
      this.$emit("edit")
    },
    handleNodeDel() {
      this.$emit("deleteNode")
    }
  }
};
</script>
<style lang="scss">
.workplace-chart {
  text-align: center;
  margin: 0;
  cursor: pointer;
  padding: 7px;
  border: 1px dotted #fff;
  font-size: 13px;
  background: #EFF4f8;
  /*&:hover{*/
    /*background: white;*/
    /*color:#409eff;*/
    /*border: 1px dotted #409eff;*/
  /*}*/
  i.iconType {
    display: inline-block;
    background-repeat: no-repeat;
    background-position: center;
    font-size: 20px;
    color: #409eff;
    cursor: pointer;
    margin-bottom: 5px;
    touch-action: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    user-select: none;
    &.circle {
      background-image: url(../../assets/images/demo/circle.png);
      width: 45px;
      height: 45px;
      line-height: 45px;
      background-size: 100%;
    }
    &.diamond {
      background-image: url(../../assets/images/demo/diamond.png);
      width: 45px;
      height: 45px;
      line-height: 45px;
      background-size: 100%;
    }
  }
  span {
    display: block;
  }
  .del, .node-collapse {
    position:absolute;
    top: -4px;
    left: 2px;
    /* background-color:#ccc; */
    padding:1px;
    cursor:pointer;
    font-size:13px;
    width:20px;
    height:20px;
    border-radius: 50%;
    text-align:center;
    display:block;
    line-height: 30px;
  }
  .ep {
    opacity: 0;
    position: absolute;
    right: 0;
    top: 0;
    width: 10px;
    height: 10px;
    background: #409eff;
    border-radius: 5px;
  }
  &:hover {
    .ep {
      opacity: 1;
    }
  }
  &.dragHover {
    .ep {
      opacity: 0;
    }
  }
}
</style>


