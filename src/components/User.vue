<template lang="pug">
    #user
        h1| 我的 Dravatar
        div(v-if="account")
          img(:src="avatar" class="image")
          div(style="padding: 14px;")
              span|你的以太坊钱包地址: {{ address }}

          el-row|
            el-button(type="primary" icon='iconfont icon-user'
            round class="button" @click="changeAvatar"
            v-if="signature")|更新头像
            Sign(v-if="!signature")
            el-button(type="primary" icon='iconfont icon-link'
            round class="button clip" :data-clipboard-text="avatarUrl")|获得头像外链

          my-upload(field="img"
            v-if="signature"
            @crop-upload-success="cropUploadSuccess"
            @crop-upload-fail="cropUploadFail"
            v-model="isUpload"
            :width="256"
            :height="256" :url="uploadDest"
            :headers="headers" img-format="jpg")
</template>

<script>
import Clipboard from 'clipboard'
import myUpload from 'vue-image-crop-upload'
import { getAvatar } from '@/avatar'
import Sign from './Sign'
import { getMyAddr } from '@/api'
import { uploadServer } from '@/config'
// eslint-disable-next-line
const clipboard = new Clipboard(".clip");
export default {
  components: {
    myUpload,
    Sign
  },
  data () {
    return {
      isUpload: false,
      avatar: '',
      address: ''
    }
  },
  computed: {
    uploadDest () {
      return `http://${uploadServer}:8000/updateAvatar/`
    },
    account () {
      return this.$store.state.account
    },
    signature () {
      return this.$store.state.account.signature
    },
    avatarUrl () {
      let address = this.address.toLowerCase()
      const url =
        'https://s3-ap-northeast-1.amazonaws.com/dravatar.frankwei.xyz/'
      return `${url}${address}`
    },
    headers () {
      return { Authorization: `Bearer ${this.signature.result}` }
    }
  },
  async created () {
    if (this.$store.state.account.signature === undefined) {
      this.$store.dispatch('fetchAccount')
    }
    // getAvatar('0x7Abe675E58Ce7fF61DB425665046B88B72561e7A')
    // this.$store.dispatch("fetchAccount")
    this.address = await getMyAddr()
    this.avatar = await getAvatar(this.address)
  },
  methods: {
    changeAvatar () {
      this.isUpload = true
      // this.$router.push({ name: 'Avatar' })
    },
    cropUploadSuccess (jsonData, field) {
      console.log('-------- upload success --------')
      console.log(jsonData)
      console.log('field: ' + field)
      this.$message('头像修改成功 三分钟左右生效')
    },
    cropUploadFail (status, field) {
      console.log('-------- upload fail --------')
      console.log(status)
      console.log('field: ' + field)
      this.$message.error('头像修改失败，未知错误')
    }
  }
}
</script>

<style scoped>
.image {
  border-radius: 1rem;
}
</style>
