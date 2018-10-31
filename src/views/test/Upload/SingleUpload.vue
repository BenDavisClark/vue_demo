<template>
  <el-upload
    accept="image/png,image/gif,image/jpeg,image/bmp"
    v-loading.body="listLoading"
    element-loading-text="上传中，请稍候..."
    class="avatar-uploader"
    action="https://httpbin.org/post"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload">
    <img v-if="imageUrl" :src="imageUrl" class="avatar" >
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>
<script>
import { Loading } from 'element-ui';
export default {
  data () {
    return {
      imageUrl: '',
      listLoading:false
    }
  },

  methods: {
    handleAvatarSuccess (res, file) {
    /*  let loadingInstance = Loading.service({
        text:"上传中，请稍后..."
      })
      loadingInstance.close();*/
      this.listLoading = false
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
     /* Loading.service({ text:"上传中，请稍候..."})*/
      this.listLoading = true
      const isJPG = file.type === 'image/jpeg'
      const isGIF = file.type === 'image/gif'
      const isPNG = file.type === 'image/png'
      const isBMP = file.type === 'image/bmp'
      const isLt2M = file.size / 1024 / 1024 < 10
      if (!isJPG && !isGIF && !isPNG && !isBMP) {
        this.$message.error('上传图片必须是JPG/GIF/PNG/BMP 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 10MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 78px;
  height: 78px;
  line-height: 78px;
  text-align: center;
}
.avatar {
  width: 78px;
  height: 78px;
  display: block;
}
</style>
