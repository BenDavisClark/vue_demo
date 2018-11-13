<template>
  <div id="galley">
    <ul class="pictures">
      <li>
        <img :src=testImg1
             alt="Cuo Na Lake">
      </li>
      <li>
        <img :src=testImg2
             alt="Tibetan Plateau">
      </li>
      <li>
        <img :src=testImg3
             alt="Jokhang Temple">
      </li>
    </ul>
  </div>
</template>

<script>
  import testImg1 from '@/assets/images/test/4.jpg'
  import testImg2 from '@/assets/images/test/5.jpg'
  import testImg3 from '@/assets/images/test/6.jpg'
  import Viewer from 'viewerjs'
  import '../../../node_modules/viewerjs/dist/viewer.css'

  export default {
     data () {
        return {
          testImg1,
          testImg2,
          testImg3,
          centerDialogVisible: true
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
