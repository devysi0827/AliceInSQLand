<template>
  <div class="intro-wrap">
    <img src="@/assets/logo.png" alt="" class="intro-logo">
    
    <div class="intro-header-text">
      <div class="intro-header-text-1">What is</div>
      <div class="intro-header-text-2">Alice in SQLand?</div>
    </div>
    
    <div class="intro-img-wrap">
      <img class="intro-img" src="@/assets/example.png" alt="">
    </div>

    <div class="intro-text">
      SQL 기초 문법부터 심화 문법까지<br>
      게임을 통해 재미있게 학습할 수 있는 사이트입니다.<br>
      앨리스가 되어 체셔고양이와 함께 모든 문제를 풀어보세요!
    </div>

    <a class="to-group-notion" target="_blank" href="https://victorious-dahlia-ae0.notion.site/A106-8e0ac3d91d984608b28abbba394b3721">더 많은 이야기 보기 ></a>
  </div>
</template>

<script>
export default {
  name: "Intro"
}
</script>

<style scoped>
.intro-header-text {
  margin-top: 1vh;
  font-family: "NEXON Lv2 Gothic";
  font-size: 1.5vw;
  letter-spacing: 0.1em;
}

.intro-header-text-2 {
  font-size: 2vw;
  font-weight: bold;
}

.intro-img {
  width: 100%;
}

.intro-img-wrap {
  width: 40vw;
  margin: 3vw;
  padding: 1vw;
  border: 0.3vw solid;
  border-image: linear-gradient(to right, #93B2F0, #74C4B7, #8353D7);
  border-image-slice: 1;
}

.intro-logo {
  width: 8vw;
}

.intro-text {
  font-family: "NEXON Lv2 Gothic Light";
  font-size: 1.2vw;
  line-height: 2vw;
}

.intro-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  height: 100vh;
  justify-content: center;
}

.to-group-notion {
  margin-top: 2vw;
  font-size: 1vw;
  text-decoration: none;
  color: #4C80E7;
}
</style>