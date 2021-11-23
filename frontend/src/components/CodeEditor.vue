<template>
  <div>
    <div id="editor-title">&nbsp;EDITOR</div>
    <textarea id="code-editor"></textarea>
    <button @click="onClick" class="submit-code">실행</button>
  </div>
</template>

<script>
import * as CodeMirror from 'codemirror'
// import 'codemirror/lib/codemirror.css'
import './codemirror.css'
import 'codemirror/theme/dracula.css'
import 'codemirror/mode/sql/sql.js'
import EventBus from "@/utils/event-bus";

export default {
  name: "CodeEditor",
  methods: {
    onClick() {
      // 정답 테이블 출력
      const rawCode = document.querySelector('.CodeMirror').CodeMirror.getValue();
      const params = {
        query: rawCode,
        stage: this.$store.state.websql.currentStage,
        problemNumber: this.$store.state.websql.currentLevel
      }
      EventBus.$emit('on-query')
      this.$store.dispatch('getQuery', params)
    },
  },
  mounted() {
   CodeMirror.fromTextArea(document.getElementById('code-editor'), {
      lineNumbers: true,
      mode: 'sql',
    })
  },
}
</script>

<style scoped>

#editor-title {
  font-family: 'NEXONFootballGothicLA1';
  background-color: #1E073A;
  color: #FFFFFF;

}

span.cm-keyword {
  color: #A1E0FF
}

.submit-code {
  border-radius: 0;
  position: absolute;
  bottom: 5px;
  right: 5px;
  font-family: 'NEXON Lv2 Gothic';
  z-index: 999;

}
</style>