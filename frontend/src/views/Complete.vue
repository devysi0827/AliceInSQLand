<template>
  <div>
    <img src="@/assets/logo.png" alt="" @click="$router.push('/')" class="to-main">
    <div class="certificate-wrap">
      <div class="img-wrap">
        <img src="@/assets/certificate.png" alt="" class="certificate">
        <div id="certificate-nickname">{{nickname}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import cookies from "vue-cookies";

export default {
  name: "Complete",
  computed: {
    ...mapState({
      nickname: state => state.user.nickname
    }),
  },
  mounted() {
    window.document.getElementById('certificate-nickname').blur()
  },
  // 완료하지 못한 경우 수료증 페이지 접근 불가
  beforeRouteEnter(to, from, next) {
    const status = cookies.get('status')
    if (Object.values(status).every((complete) => complete)) {
      next()
    } else {
      next(vm => {
        if (vm.nickname) {
          vm.$router.push('/game')
        } else {
          next('/nickname')
        }
      })
    }
  }
}
</script>

<style scoped>
.certificate {
  width: 100%;
  position: relative;
}

.certificate-wrap {
  display: flex;
  align-items: center;

}

.img-wrap {
  position: relative;
}

.to-main {
  cursor: pointer;
  display: block;
  margin: 5vh auto;
  width: 15vw;
}

#certificate-nickname {
  position: absolute;
  width: 100%;
  top: 39%;
  font-family: Serif;
  font-size: 5vw;
  text-align: center;
}
</style>