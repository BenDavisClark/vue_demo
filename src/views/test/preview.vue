<template>
  <div>
    <div class="list" v-for="(n, index) in imageList" :data-index="index">
      <img @click="open($event)" :src="n.url">
    </div>
    <a href="http://ocm0knkb1.bkt.clouddn.com/1-1.jpg" target="_blank">查看图片</a>
  </div>
</template>

<script>
  import fancyBox from 'vue-fancybox'
  import testImg1 from '@/assets/images/test/4.jpg'
  import testImg2 from '@/assets/images/test/5.jpg'
  import testImg3 from '@/assets/images/test/6.jpg'
  export default {
     data () {
        return {
          imageList: [
            { width: 200, height: 100, url: testImg1 },
            { width: 200, height: 100, url: testImg2 },
            { width: 200, height: 100, url: testImg3 }
          ]
        }
      },
      methods: {
       open (e) {
          fancyBox(e.target, this.imageList);
        }
      }
  }

</script>

<style  rel="stylesheet/scss" lang="scss">
 .list{
   margin:20px;
   img{
     width:200px;
     height:200px;
     float:left;
     margin-right:20px;
   }
 }
</style>
