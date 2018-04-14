<template lang="pug">
  .hello
    el-upload(
      class="avatar-uploader"
      action='http://localhost:8000/updateAvatar/'
      drag
      :headers='headers'
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload")
      img(v-if="avatarUrl" :src="avatarUrl" class="avatar")
      i.el-icon-upload(v-else)
      .el-upload__text|将文件拖到此处，或点击上传
      .el-upload__tip(slot="tip")|只能上传jpg/png文件，且不超过500kb
    button(v-on:click="sign()")|Sign
  </div>
</template>

<script>
// import {  } from '@/api'
export default {
  name: 'HelloWorld',
  data () {
    return {
    }
  },
  computed: {
    account () {
      return this.$store.state.account
    },
    address () {
      return this.account['address']
    },
    signature () {
      return this.account['signature']
    },
    avatarUrl () {
      const url = 'foobar.com'
      return this.address ? `${url}/${this.address}` : ''
    },
    headers () {
      return { Authorization: `Bearer ${this.signature.result}` }
    }
  },
  created () {},
  methods: {
    handleAvatarSuccess (res, file) {
      this.avatarUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isPNG = file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!(isJPG || isPNG)) {
        this.$message.error('上传头像图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    handleUpload (file) {
      console.log('trigger')
    }
  }
}
</script>

<style scoped>
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
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
