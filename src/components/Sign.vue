<template lang="pug">
      el-button(type="primary" icon="iconfont icon-user" v-if="isLogin" round @click="jump('User')")| 查看我的 Dravatar
      el-button(type="primary" icon="el-icon-edit" v-else round @click="login")| 使用签名登录
</template>

<script>
export default {
  name: 'Sign',
  props: ['afterSign'],
  computed: {
    isLogin () {
      return !(!this.$store.state.account.signature)
    }
  },
  methods: {
    dispatch (action) {
      return this.$store.dispatch(action)
    },
    jump (name) {
      this.$router.push({ name })
    },
    login () {
      this.dispatch('fetchAccountDetail')
        .then(() => {
          if (this.afterSign !== undefined) {
            this.jump(this.afterSign)
          }
        })
        .catch(() => {
          this.$notify.error({
            title: '登录错误',
            message: '请安装或解锁 MetaMask 插件'
          })
        })
    }
  }
}
</script>
