<template>
  <div>
    <WelcomeToASL></WelcomeToASL>
    <Intro></Intro>
    <Info></Info>
    <Modal v-if="isModal" @button1="keepPlaying" @button2="startNew">
      <span slot="body">{{this.nickname}}님!<br> 기존에 진행하던 게임을 이어 하시겠습니까?</span>
      <span slot="button1">이어하기</span>
      <span slot="button2">새로하기</span>
    </Modal>
  </div>
</template>

<script>
import {mapState} from "vuex";
import WelcomeToASL from "@/components/WelcomeToASL";
import Intro from "@/components/Intro";
import Info from "@/components/Info";
import Modal from "@/components/ConfirmModal";
import cookies from "vue-cookies";

export default {
  name: "Main",
  components: {
    WelcomeToASL,
    Intro,
    Info,
    Modal,
  },
  data() {
    return{
      isModal: false,
      isContinue: false,
      nextObj: null,
    }
  },
  methods: {
    keepPlaying() {
      this.nextObj('/game')
    },
    startNew() {
      // 새로 게임 시작 -> 기존 플레이 이력 삭제
      cookies.set('status', {'stage1': false, 'stage2': false, 'stage3': false, 'stage4': false})
      this.nextObj()
    }
  },
  computed: {
    ...mapState({
      nickname: state => state.user.nickname
    })
  },
  beforeRouteLeave(to, from, next) {
    if (to.path === '/nickname' && !!this.nickname) {
      this.isModal = true
      this.nextObj = next
    } else {
      next()
    }
  }
}
</script>

<style scoped>
</style>