<template>
  <div>
    <div class="main-wrap">
      <div class="main-welcome">
        <div>Welcome</div>
        <div>to</div>
        <div>
          <span class="main-welcome-a">A</span>
          <span>lice</span>
        </div>
        <div>in</div>
        <div>
          <span class="main-welcome-s">S</span>
          <span>Q</span>
          <span class="main-welcome-l">L</span>
          <span>and!</span>
        </div>
      </div>
      <img src="@/assets/logo.png" alt="" class="main-logo">
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomeToASL",

}
</script>

<style scoped>
.main-button {
  width: 39vw;
  border: 0.3vw solid;
  border-image: linear-gradient(to right, #93B2F0, #74C4B7, #8353D7);
  border-image-slice: 1;
  background-color: #FFFFFF;
  text-align: center;
  text-decoration: none;
  font-size: 1.3vw;
  font-family: NEXONFootballGothicBA1;
  letter-spacing: 0.2em;
  margin: 0.3em;
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

.main-logo {
  width: 40vw;
  margin: 0.2em 0;
}

.main-welcome {
  width: 30%;
  color: darkgrey;
  display: flex;
  justify-content: space-around;
  letter-spacing: 0.2em;
  font-family: "NEXONFootballGothicLA1";
  font-size: 1vw;
}

.main-welcome-a {
  color: #4C80E7;
}

.main-welcome-s {
  color: #74C4B7;
}

.main-welcome-l {
  color: #6C557D;
}

.main-wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>