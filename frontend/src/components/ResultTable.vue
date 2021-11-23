<template>
  <div>
    <table v-if="resultTable" v-html="resultTable"></table>
    <button v-if="isAnswer" @click="onSuccess" class="level-success">정답입니다! <br> 다음 문제를 풀기 위해서는 저를 눌러주세요!</button>
  </div>
</template>

<script>

import {mapGetters, mapState} from "vuex";
import EventBus from "@/utils/event-bus";
import cookies from "vue-cookies";

export default {
  name: "ResultTable",
  data() {
    return{
      stage1: 2,
      stage2: 9,
      // stage3 -> lv 6 문제 제외
      stage3: 5,
      stage4: 4
    }
  },
  methods: {
    onSuccess() {
      EventBus.$emit('on-success')
      // 쿠키 업데이트

      const status = cookies.get('status')
      if (this[this.currentStage] === this.currentLevel) {
        status[this.currentStage] = true
      }
      cookies.set('status', status)

    }
  },
  computed: {
    ...mapState({
      currentStage: state => state.websql.currentStage,
      currentLevel: state => state.websql.currentLevel,
    }),
    ...mapGetters(['resultTable', 'isAnswer'])
  },
}
</script>

<style scoped>

.level-success {
  width: 100%;
  font-family: 'NEXON Lv2 Gothic Light';
  position: absolute;
  bottom: 3px;
  background-color: #6C557D;
  border-top: 1px solid #A286C6;
  border-bottom: 1px solid #A286C6;
  border-right: none;
  border-left: none;
  color: #FFFFFF;
  line-height: 1.6em;
  cursor: pointer;
}

::v-deep table {
  background-color: #1E073A;
  margin-left: 5px;
  font-family: 'NEXONFootballGothicLA1';
  width: calc(100% - 10px);
  padding: 2px 0;
  text-align: center;
  border-collapse: collapse;
}
::v-deep th {
  color: #FFFFFF;
  border-bottom: 1px solid #6C557D;
  border-left: 1px solid #6C557D;
  /*font-size: 0.8vw;*/
  padding: 0 2px;
}

::v-deep td {
  color: #A286C6;
  border-bottom: 1px solid #6C557D;
  border-left: 1px solid #6C557D;
  font-size: 0.8vw;
  padding: 0 2px;
}

::v-deep td:first-child, ::v-deep th:first-child {
  border-left: none;
}
</style>