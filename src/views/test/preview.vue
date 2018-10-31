<template>
  <div>
    <div class="list" v-for="(n, index) in imageList" :data-index="index">
      <img @click="open($event)" :src="n.url">
    </div>
  </div>
</template>

<script>
  import fancyBox from 'vue-fancybox'
  export default {
     data () {
        return {
          imageList: [
            { width: 200, height: 100, url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg' },
            { width: 200, height: 100, url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg' },
            { width: 200, height: 100, url: 'http://ocm0knkb1.bkt.clouddn.com/1-3.jpg' }
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
