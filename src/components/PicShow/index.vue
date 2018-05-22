<template>
    <div id="picshow"> 
        <div class="rightView">
            <div class="big">
                <span v-for="(point,index) in pointarr" v-bind:key="index" :id="point.id" class="dam-point" :style="{left:point.x + 'px',top:point.y + 'px',display: point.display}">
                </span>
                <img src="static/dam.png">
            </div>
        </div>
        <div class="leftView">
            <div class="mask"></div>
            <img class="small"
                 src="static/dam-small.png">
        </div>
    </div>
</template>
<script>
function showpic() {
  'use strict'
  // 选择器
  function $(el) {
    return document.querySelector(el)
  }
  // 获取元素
  let picshow = $('#picshow')
  let leftView = $('.leftView')
  let mask = $('.mask')
  let smallImg = $('.small')
  let rightView = $('.rightView')
  let bigImg = $('.big')
  // 显示放大遮罩与放大的图片容器
  leftView.addEventListener(
    'mouseover',
    function() {
      //mask.style.display = 'block'
      //rightView.style.display = 'block'
    },
    false
  )
  // 隐藏放大遮罩与放大的图片容器
  leftView.addEventListener('mouseout', function() {
    //mask.style.display = 'none'
    //rightView.style.display = 'none'
  })
  // 放大遮罩移动放大图片
  leftView.addEventListener(
    'mousemove',
    function(evt) {
      evt = evt || window.event
      // 获取当前鼠标的位置
      let currentMouseX = evt.pageX
      let currentMouseY = evt.pageY
      // 获取要放大图片左侧与顶部的偏移距离
      let offsetLeft = picshow.offsetLeft
      let offsetTop = picshow.offsetTop
      // 获取放大遮罩的大小
      let maskWidth = mask.offsetWidth
      let maskHeight = mask.offsetHeight
      // 计算鼠标移动后放大遮罩的位置 位置 = 当前鼠标的位置 - 偏移距离 - 放大遮罩大小/2
      let zoomMaskX = currentMouseX - offsetLeft - maskWidth / 2
      let zoomMaskY = currentMouseY - offsetTop - maskHeight / 2
      // 限制鼠标上侧与左侧的范围
      if (zoomMaskX <= 0) {
        zoomMaskX = 0
      }
      if (zoomMaskY <= 0) {
        zoomMaskY = 0
      }
      // 限制鼠标右侧与下侧的范围
      let maxScopeX = leftView.offsetWidth - maskWidth
      if (zoomMaskX >= maxScopeX) {
        zoomMaskX = maxScopeX
      }
      let maxkScopeY = leftView.offsetHeight - maskHeight
      if (zoomMaskY >= maxkScopeY) {
        zoomMaskY = maxkScopeY
      }
      mask.style.left = zoomMaskX + 'px'
      mask.style.top = zoomMaskY + 'px'
      // 计算图片放大比例 比例= (大图长度 - 大图父容器长度) / (小图父容器长度 - 放大遮罩长度)
      let zommProportion =
        (bigImg.offsetWidth - rightView.offsetWidth) /
        (leftView.offsetWidth - maskWidth)
      bigImg.style.left = -zommProportion * zoomMaskX + 'px'
      bigImg.style.top = -zommProportion * zoomMaskY + 'px'
    },
    false
  )
}
export default {
  props: {
    pointarr: ''
  },
  mounted() {
    console.log(this.pointarr)
    showpic()
  }
}
</script>
<style lang="scss" scoped>
#picshow {
  position: relative;
  .leftView {
    width: 250px;
    height: 80px;
    position: relative;
    .mask {
      width: 80px;
      height: 80px;
      position: absolute;
      display: block;
      cursor: move;
      top: 0;
      left: 0;
      background: rgba(50, 153, 248, 0.4);
    }
    .small {
      width: 100%;
      height: 100%;
    }
  }
  .rightView {
    width: 1000px;
    height: 500px;
    display: block;
    position: relative;
    overflow: hidden;
    .big {
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .dam-point{
      display: block;
      position: absolute;
      width:10px;
      height: 10px;
      border: 2px solid red;
  }
  .dp1{
      left: 150px;
      top:200px;
  }
  .dp2{
      left:500px;
      top: 450px;
  }
}
</style>
