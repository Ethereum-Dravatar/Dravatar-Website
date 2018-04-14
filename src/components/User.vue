<template lang="pug">
    el-card(:body-style="{ padding: '0px' }")
      img(:src="avatarUrl" class="image")
      div(style="padding: 14px;")
        span|账户 {{ address }}
        div(class="bottom clearfix")
          time.time|{{ currentDate }}
          el-button(type="text" class="button" @click="changeAvatar")|更新头像
        </div>
      </div>
    </el-card>
</template>

<script>
export default {
  computed: {
    account () {
      return this.$store.state.account
    },
    address () {
      return this.account.account
    },
    signature () {
      return this.account.signature
    },
    avatarUrl () {
      let address = this.address.toLowerCase()
      const url =
        'https://s3-ap-northeast-1.amazonaws.com/dravatar.frankwei.xyz/'
      return `${url}${address}`
    }
  },
  methods: {
    changeAvatar () {
      this.$router.push({ name: 'Avatar' })
    }
  }
}
</script>
