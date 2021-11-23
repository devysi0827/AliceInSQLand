<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import cookies from "vue-cookies"


export default {
  name: 'App',
  components: {
  },
  created() {
    // cookies에 아무것도 저장되어 있지 않다면, 처음 들어오는 사람이다 ->
    // 닉네임이랑, 게임 레벨 클리어 초기화해서 쿠키에 저장
    const nickname = cookies.get('nickname')
    if (!nickname) {
      cookies.set('nickname', '')
      // cookies.set('status', [false, false, false, false])
    } else {
      this.$store.dispatch('setNickname', nickname)
    }
    const status = cookies.get('status')
    if (!status) {
      cookies.set('status', {'stage1': false, 'stage2': false, 'stage3': false, 'stage4': false})
    }
  },
}
</script>

<style>

</style>
