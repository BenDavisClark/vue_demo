<template>
  <div id="galley">
    <ul class="pictures">
      <li>
        <img src="http://ocm0knkb1.bkt.clouddn.com/1-1.jpg"
             alt="Cuo Na Lake">
      </li>
      <li>
        <img src="http://ocm0knkb1.bkt.clouddn.com/1-2.jpg"
             alt="Tibetan Plateau">
      </li>
      <li>
        <img src="http://ocm0knkb1.bkt.clouddn.com/1-3.jpg"
             alt="Jokhang Temple">
      </li>
    </ul>
  </div>
</template>

<script>
  import Viewer from 'viewerjs'
  import '../../../node_modules/viewerjs/dist/viewer.css'

  export default {
     data () {
        return {
        }
      },
    mounted(){
      var galley = document.getElementById('galley');
      viewer = new Viewer(galley,{
         scalable:false,
         rotatable:true,
         fullscreen:false,
         title:false,
         zoomRatio:0.1,
         minZoomRatio:0.1,
        maxZoomRatio:10
       });
    }
  }

</script>

<style  rel="stylesheet/scss" lang="scss">
  .pictures {
    margin:20px;
    width: 100%;
    li{
      float:left;
      margin-right:20px;
      img{
        width: 200px;
        height: 200px;
      }
    }
  }
</style>
