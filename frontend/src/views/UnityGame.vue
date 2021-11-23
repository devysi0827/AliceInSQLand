
<template>
  <div id="unityBox" ref="unityBox">

    <h2>Message from Unity</h2>
    <p id="fromUnityMessage">유니티에서 답오면 바뀜</p>

    <!-- <button @click="commande()">kk</button> -->
    <!-- 기술흐름도
    이 페이지랑 public/index.html만 보면 됌!
    1. 버튼 누름
    2. 'commandToUnity' 함수는 내부 web unity의 'Example'함수를 실행시킴
    3.  unity의 'Example' 함수는 public/index.html의 MyFunction2를 실행시킴
    3-2. 이때, arg로 변수를 받을 수 잇음
    4. document.getElementById('fromUnityMessage').innerHTML = "500"으로 문서자체에서 id tag를 잡아서
    값을 수정할 수 있음.
    5. 4의 값을 마찬가지로 읽어와서 unity size에 적용

    %% 문제점: vue내부의 width란 변수에 접근하지 못함.
    만약 4에서 width값이 500으로 바뀐다면 5를 생략하고 사이즈조절이 자동으로 가능해짐
    하지만 4에서 자동으로 안되므로 5에서 버튼을 눌러야해서 수동적으로밖에 사이즈조절이 안됌
    -->
    <button @click="commandToUnity()">유니티에 명령내리기</button>
    <button @click="resize()">사이즈 바꾸기</button>
    <!-- unity -->
    <unity
    src="./unity/Build/build.json"
    :height = height
    :width = width
    unityLoader="./unity/Build/UnityLoader.js"
    ref = "unitys"
    >
    </unity>
  </div>  
</template>

<script>
import Unity from 'vue-unity-webgl'

export default {
  name: 'UnityGame',
  data() {
        return {
            height : '600',
            width : '1000',
            kkk : null
        }
    },
  components: {
    Unity
  },
  methods: {

    resize() {
      if (this.width == '1000') {
        // this.width = '1000'
        this.width = document.getElementById("fromUnityMessage").innerText
      }
      else {
        this.width = '1000'
      }
    },
    commandToUnity() {
      this.$refs.unitys.message('GetButton','Example');
    },
    // commande() {
    //   this.$refs.unitys.message('GameManger','Test');
    // },
  //   receiveMessageFromUnity(txt) {
  //     // Get element to assign the message
  //     const lblMessage = document.getElementById("lblMessage");

  //     // Assign received from Unity message
  //     lblMessage.innerText = txt;
  //  }
  },

  // mounted: function(){
  //   console.log(this.$refs.unitys);
  //   document.addEventListener('click', function (e) {
  //     console.log(e)
  //   })
  // }
}
</script>

<style>
</style>
