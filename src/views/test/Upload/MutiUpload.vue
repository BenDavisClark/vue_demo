<template>
    <div id="MutiUploads">
        <el-upload
            class="uploader"
            multiple
            action="https://httpbin.org/post"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" style="height:83%">
            <img width="100%"  :src="dialogImageUrl"  alt="">
        </el-dialog>
    </div>
</template>
<script>
export default {
  data() {
    return {
      imgLength: 1,
      dialogImageUrl: [],
      dialogVisible: false
    }
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file, fileList) {
      console.log(fileList)
      console.log(file)
      this.dialogImageUrl= file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style lang="scss">
  #MutiUploads{
    .el-dialog__wrapper{height:97%;}
    .el-dialog{
      height:85%!important;
    }
    .el-dialog__body{
      height: 97%!important;
      img{
        height:100%!important;
      }
    }

  }
.uploader {
  .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    &:hover{
      border-color: #409eff;
    }
  }
  .el-upload--picture-card {
    font-size: 28px;
    color: #8c939d;
    width: 78px;
    height: 78px;
    line-height: 78px;
    text-align: center;
  }
  .el-upload-list--picture-card{
    .el-upload-list__item{
      width: 78px;
      height: 78px;
      margin: 0 8px 0 0;
    }
  }
}
</style>
