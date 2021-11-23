<template>
  <div>
    <div class="nickname-wrap">
      <div class="nickname-info">게임에서 사용할 닉네임을 입력하세요.</div>
      <input id="input-nickname" type="text" class="nickname-input" v-model="nickname" @keypress.enter="saveNickname" autofocus/>
      <button class="nickname-submit" :class="{disabled: disabled}" @click="saveNickname">
        <img src="@/assets/logo-small.png" alt="">
      </button>
    </div>
  </div>
</template>

<script>
import cookies from "vue-cookies";

export default {
  name: "SetNickname",
  data() {
    return{
      nickname: '',
    }
  },
  methods: {
    saveNickname() {
      cookies.set('nickname', this.nickname)
      this.$store.dispatch('setNickname', this.nickname)
      this.$router.push('/game')
    }
  },
  computed: {
    disabled() {
      return !this.nickname
    }
  },
  mounted() {
    // 기존에 닉네임 있는 경우, 그대로 입력해놔준다
    this.nickname = this.$store.state.user.nickname
    // 항상 input창에 focus
    document.getElementById('input-nickname').focus()
  }
}
</script>

<style scoped>
.disabled {
  opacity: 50%;
  pointer-events: none;
}

.nickname-wrap {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.nickname-info {
  font-family: 'NEXON Lv2 Gothic';
  font-weight: 600;
  font-size: 1.8vw;
  letter-spacing: 0.2vw;
}

.nickname-input {
  width: 30vw;
  font-family: NEXONFootballGothicLA1;
  text-align: center;
  font-size: 1.8vw;
  border: 0.3vw solid;
  border-image: linear-gradient(to right, #93B2F0, #74C4B7, #8353D7);
  border-image-slice: 1;
  margin: 2vw;
  padding: 0.5vw;
  background: linear-gradient(to right, #93B2F0, #74C4B7, #8353D7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nickname-input:focus {
  outline: none;
}

.nickname-submit {
  background: none;
  border: none;
}

.nickname-submit img {
  width: 6vw;
  cursor: pointer;
}
</style>