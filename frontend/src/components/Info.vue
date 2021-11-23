<template>
  <div>
    <div class="info-wrap">
      <div class="info-title">
        Alice in SQLand
      </div>
      <div class="info-info">
        어떻게 이용할까요?
      </div>

      <div class="comment-wrap">
        <div class="comment-box">
          <div class="comment-img-wrap">
            <img src="@/assets/info-move.png" alt="" class="comment-img">
          </div>
          <div class="comment-word">
            방향키를 움직여<br> SQLand를 탐험하세요.
          </div>
        </div>

        <div class="comment-box">
          <div class="comment-img-wrap">
            <img src="@/assets/info-conversation.png" alt="" class="comment-img">
          </div>
          <div class="comment-word">
            스페이스바를 이용해 <br>
            게임 속 캐릭터들과 대화를 나눠보세요.
          </div>
        </div>

        <div class="comment-box">
          <div class="comment-img-wrap">
            <img src="@/assets/info-loading.png" alt="" class="comment-img">
          </div>
          <div class="comment-word">
            게임을 처음 실행하는 경우 <br>
            최장 1분 정도 <br>
            로딩이 있을 수 있습니다.
          </div>
        </div>

        <div class="comment-box">
          <div class="comment-img-wrap">
            <img src="@/assets/info-hardware.png" alt="" class="comment-img">
          </div>
          <div class="comment-word">
            원활한 게임 진행을 위해 <br>
            하드웨어 가속 기능을 <br>
            사용해주세요. <br>
            <a href="https://victorious-dahlia-ae0.notion.site/2c9989d5c66e46d4889d5b9c5a892dc9" target="_blank">
              하드웨어 가속 설정방법 확인하기 &gt;
            </a>
          </div>
        </div>

    </div>
      <router-link to="/nickname" class="main-button"><span>입장하기</span></router-link>
  </div>
  </div>
</template>

<script>
export default {
  name: "Info"
}
</script>

<style scoped>
.comment-box {
  height: 40vh;
  width: 20%;
}

.comment-img {
  width: 30%;
  align-self: center;
}

.comment-img-wrap{
  height: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.comment-word {
  font-family: "NEXON Lv2 Gothic";
  font-size: 1.2vw;
  line-height: 2vw;
}

.comment-word a {
  color: #999999;
}

.comment-wrap {
  display: flex;
  text-align: center;
  font-size: 1.4vw;
  line-height: 2.1vw;
  justify-content: space-around;
}

.info-info {
  font-family: "NEXON Lv2 Gothic";
  font-weight: 600;
  font-size: 3vw;
  margin-bottom: 3vh;
}

.info-title {
  font-weight: 600;
  font-size: 2vw;
  line-height: 4vw;
}

.info-wrap {
  position: relative;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: "NEXON Lv2 Gothic";
}


.intro-logo {
  position: absolute;
  top: 10vh;
  left: 0;
  right: 0;
  width: 15vh;
  margin: auto;

}

.main-button {
  width: 40vw;
  border: 0.3vw solid;
  border-image: linear-gradient(to right, #93B2F0, #74C4B7, #8353D7);
  border-image-slice: 1;
  background-color: #FFFFFF;
  text-align: center;
  text-decoration: none;
  font-size: 2vw;
  font-family: NEXONFootballGothicBA1;
  letter-spacing: 0.2em;
  margin-top: 10vh;
  padding: 0.5vw;
}

.main-button:hover {
  background: linear-gradient(to right, #93B2F0, #74C4B7, #8353D7);
}

.main-button span {
  background: linear-gradient(to right, #93B2F0, #74C4B7, #8353D7);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.main-button:hover span {
  background: none;
  color: #FFFFFF;
  -webkit-text-fill-color: #FFFFFF;

}
</style>