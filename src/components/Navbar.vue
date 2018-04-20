<template lang="pug">
el-menu.menu(router,
:default-active="$route.path", :default-openeds="['/']",
mode="horizontal")
  el-menu-item(index="/")
    span(slot="title")
      | Dravatar
  el-menu-item(index="/my")
    span(slot="title")
      | 我的 Dravatar
</template>

<style lang="stylus" scoped>
.menu {
  height: 100%;
}
</style>
