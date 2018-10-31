<template>
  <div>
    <div class="list" v-for="(n, index) in imageList" :data-index="index">
      <img :src="n.url" preview="1" :preview-text="'第'+(index+1)+'张图片'">
    </div>
  </div>
</template>

<script>
  export default {
     data () {
        return {
          imageList: [
            { url: 'http://ocm0knkb1.bkt.clouddn.com/1-1.jpg' },
            { url: 'http://ocm0knkb1.bkt.clouddn.com/1-2.jpg' },
            { url: 'http://ocm0knkb1.bkt.clouddn.com/1-3.jpg' }
          ]
        }
      }
  }

</script>

<style  rel="stylesheet/scss" lang="scss">
  .pswp__bg{
    opacity: 0.75!important;
  }
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
