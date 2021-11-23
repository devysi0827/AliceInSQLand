<template>
  <div>
    <!--<button @click="commandToUnity()">사이즈조절하기</button>-->
    <!--<button @click="AnswerToUnity()">정답처리(문제레벌+1)</button>-->
    <!--<button @click="WrongAnswerToUnity()">오답처리(멈춤풀림)</button>-->
    <!--<button @click="CallHtml()">현재 문제정보확인하기</button>-->
    <!--<button @click="StageMove1()">스테이지1로</button>-->
    <!--<button @click="StageMove3()">스테이지3으로</button>-->
    <!--<button @click="Size()">size</button>-->

    <div id="unity-wrap">
      <Unity
          src="./unity/Build/build.json"
          unityLoader="./unity/Build/UnityLoader.js"
          ref = "unitys"
          :height="unityHeight"
          :style="`width: ${unityWidth}`"
          :hideFooter="true"
      ></Unity>
      <div v-if="isEditor" id="editor-wrap">
        <TableSet id="tables"></TableSet>
        <CodeEditor id="editor" @submit="onQuery"></CodeEditor>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";
import cookies from "vue-cookies";
import Unity from 'vue-unity-webgl';
import CodeEditor from "@/components/CodeEditor";
import TableSet from "@/components/TableSet";
import EventBus from "@/utils/event-bus";

export default {
  name: "Game",
  components:{
    Unity,
    TableSet,
    CodeEditor,
  },
  data() {
    return{
      unityWidth: '100%',
      isEditor: false,
      isQuery: false,
    }
  },
  methods: {
    commandToUnity() {
      this.$refs.unitys.message('Main','Resize');
    },
    // 정답
    AnswerToUnity() {
      this.$refs.unitys.message('Main','InputCorrectAnswer');
    },
    WrongAnswerToUnity() {
      this.$refs.unitys.message('Main','InputWrongAnswer');
    },
    CallHtml() {
      this.$refs.unitys.message('Main','CallHtml');
    },
    StageMove1() {
      this.$refs.unitys.message('Main','stage1');
    },
    StageMove3() {
      this.$refs.unitys.message('Main','stage3');
    },
    Size() {
      this.$refs.unitys.message('Main','Scale');
    },
    
    // commandKeyStart() {
    //   this.$refs.unitys.message('GetButton','Webglstart');
    // },
    // commandKeyEnd() {
    //   this.$refs.unitys.message('GetButton','Webglend');
    // },
    onQuery() {
      // this.isEditor = false
    }
  },
  computed: {
    unityHeight() {
      return document.documentElement.clientHeight * 0.95
    },
    ...mapState({
      nickname: state => state.user.nickname,
      startStageNum: state => state.websql.startStageNum
    })
  },
  watch: {
    isEditor: function (v){
      if (v) {
        this.$refs.unitys.message('Main','Webglend');
        // this.$refs.unitys.message('main','palse');
      } else {
        this.$refs.unitys.message('Main','Webglstart');
        // this.$refs.unitys.message('main','palse');
      }
    },
    startStageNum: function() {
      console.log('불리긴 하니?')
      const status = Object.values(cookies.get('status'))
      find: {
        for (let i=0; i < status.length; i++) {
          if (!status[i]) {
            this.$refs.unitys.message('Main', `Stage${i + 1}`)
            break find
          }
        }
      }
    }
    
  },
  created() {
    this.$store.dispatch('setNickname', cookies.get('nickname'))
    this.$store.dispatch('databaseReset')
    this.$store.dispatch('databaseResetStage1')
    this.$store.dispatch('databaseResetStage2')
    this.$store.dispatch('databaseResetStage3')
    this.$store.dispatch('databaseResetStage4')
    EventBus.$on('on-success', function() {
      this.$refs.unitys.message('Main','Resize');
      this.$refs.unitys.message('Main','InputCorrectAnswer');
      console.log('all set')
    }.bind(this))


  },
  mounted() {
    // unity에 시작 stage 통신하기
    const status = Object.values(cookies.get('status'))
    find: {
      for (let i=0; i < status.length; i++) {
        if (!status[i]) {
          this.$refs.unitys.message('Main', `Stage${i + 1}`)
          break find
        }
      }
      console.log('모든 레벨을 클리어 했으면 여기로 와요.. 우짤까요..?')
    }
  }
}
</script>

<style scoped>
#editor {
  height: 40%;
  background-color: #1E073A;
  position: relative;
}

#editor-wrap {
  position: relative;
  display: flex;
  flex-direction: column;
  width: calc(100vw - 60%);
  height: 95vh;
  /*margin-left: 20px;*/
}

#tables {
  position: relative;
  background-color: #120422;
  height: 60%;
  overflow-y: scroll;
}

#tables::-webkit-scrollbar {
  width: 7px;
}

#tables::-webkit-scrollbar-thumb {
  background: #8353D7;
  border-radius: 20px;
}


#tables::-webkit-scrollbar-track{
  background-color: rgb(18, 4, 34);
}

#unity-wrap {
  display: flex;
}
</style>