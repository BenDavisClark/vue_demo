<template>
  <div>
    <div class="list" v-for="(n, index) in imageList" :data-index="index">
      <img :src="n.url" preview="1" :preview-text="'第'+(index+1)+'张图片'">
    </div>
   <!-- <el-dialog
      title="提示"
      :visible.sync="centerDialogVisible"
      width="50%"
      center>
      <div class="list" v-for="(n, index) in imageList" :data-index="index">
        <img :src="n.url" preview="1" :preview-text="'第'+(index+1)+'张图片'">
      </div>
    </el-dialog>-->

    <el-table :data="gridData">
      <el-table-column width="150" property="date" label="日期"></el-table-column>
        <el-table-column width="200" label="姓名">
          <template slot-scope="scope">
              <span>
               <el-popover
                 placement="bottom"
                 width="auto"
                 trigger="click">
                  <div class="lists" v-for="(n, index) in imageList" :data-index="index">
                      <img :src="n.url" :preview="scope.row.id" :preview-text="'第'+(index+1)+'张图片'">
                    </div>
                  <el-button slot="reference">查看图片</el-button>
                </el-popover>
              </span>
          </template>
        </el-table-column>
      <el-table-column width="200" label="id">
        <template slot-scope="scope">
              <span>
                {{ scope.row.id }}
              </span>
        </template>
      </el-table-column>
      <el-table-column width="300" property="address" label="地址"></el-table-column>

    </el-table>


  </div>
</template>

<script>
  import testImg1 from '@/assets/images/test/4.jpg'
  import testImg2 from '@/assets/images/test/5.jpg'
  import testImg3 from '@/assets/images/test/6.jpg'
  export default {
     data () {
        return {
          gridData: [{
            id:'12345',
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            imageList: [
              { url: testImg1},
              { url: testImg2},
              { url: testImg3}
            ]
          }, {
            id:'123456',
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            imageList: [
              { url: testImg1},
              { url: testImg2},
              { url: testImg3}
            ]
          }, {
            id:'1234567',
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            imageList: [
              { url: testImg1},
              { url: testImg2},
              { url: testImg3}
            ]
          }, {
            id:'12345678',
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            imageList: [
              { url: testImg1},
              { url: testImg2},
              { url: testImg3}
            ]
          }],
          visible2: false,

        }
      }
  }

</script>

<style  rel="stylesheet/scss" lang="scss">
  #SL_balloon_obj{
    z-index: 10000;
  }
  .pswp{
    z-index: 5000!important;
  }
  .el-dialog{
    height:50%;
  }
  .pswp__bg{
    opacity: 0.75!important;
  }
  .pswp__button--arrow--left{
    left:10%!important;
  }
  .pswp__button--arrow--right{
    right:10%!important;
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
  .lists{
    img{
      width:50px;
      height:50px;
      float:left;
      margin:10px 20px 10px 0;
    }
  }
</style>
