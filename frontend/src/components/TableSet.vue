<template>
  <div>
    <div class="table-button-wrap">
      <button @click="isQuery = false" class="table-button" :class="{disabledtab: isQuery}">TABLE</button>
      <button @click="isQuery = true" class="table-button" :class="{disabledtab: !isQuery}">결과 확인</button>
    </div>
    <ResultTable v-if="isQuery" style="color: #FFFFFF"></ResultTable>
    <div v-else>
      <Table v-for="(each, idx) in schema" :content="each" :key="idx"></Table>
      <div class="revert-table-wrap">
        <transition name="fade">
          <div class="revert-table-message" v-if="isRevert">테이블 복구를 완료했습니다</div>
        </transition>
        <button class="revert-table" @click="revertTable">TABLE 원상태로 되돌리기</button>
      </div>
    </div>
  </div>
</template>

<script>
import Table from "@/components/Table";
import ResultTable from "@/components/ResultTable";
import EventBus from "@/utils/event-bus";
import {mapState} from "vuex";

export default {
  name: "TableSet",
  components: {
    Table,
    ResultTable,
  },
  data() {
    return {
      table: '',
      isQuery: false,
      isRevert: false,
    }
  },
  methods: {
    revertTable() {
      this.$store.dispatch('databaseReset')
      this.$store.dispatch('databaseResetStage1')
      this.$store.dispatch('databaseResetStage2')
      this.$store.dispatch('databaseResetStage3')
      this.$store.dispatch('databaseResetStage4')
      this.isRevert = true
      setTimeout(function() {
        this.isRevert = false
      }.bind(this), 2000)
    }
  },
  computed: {
    ...mapState({
      schema: state => state.websql.tableSchema
    })
  },
  created() {
    // event-bus 등록
    EventBus.$on('on-query', () => this.isQuery = true)
  }
}
</script>

<style scoped>
.revert-table {
  width: 100%;
  font-family: 'NEXON Lv2 Gothic Light';
  position: absolute;
  background-color: #6C557D;
  border-top: 1px solid #A286C6;
  border-bottom: 1px solid #A286C6;
  border-right: none;
  border-left: none;
  color: #FFFFFF;
  line-height: 1.6em;
  cursor: pointer;
}

.revert-table-message {
  color: #FFFFFF;
  text-align: center;
  margin-bottom: 5px;
}

.revert-table-wrap {
  position: absolute;
  bottom: 30px;
  width: 100%;
  margin: auto;
  z-index: 3;
}

.table-button {
  color: #FFFFFF;
  font-family: 'NEXONFootballGothicLA1';
  display: inline-block;
  cursor: pointer;
  width: calc(50%);
  height: 5vh;
  margin-top: 2px;
  margin-bottom: 5px;
  background-color: #120422;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  border-top: 2px solid #6C557D;
  border-left: 2px solid #6C557D;
  border-right: 2px solid #6C557D;
  border-bottom: none;
}

.table-button.disabledtab {
  border: none;
  background-color: rgba(108, 85, 125, 0.7);
  color: rgb(255, 255, 255, 0.7);
  font-family: 'NEXONFootballGothicLA1';
}

.table-button-wrap {
  position: relative;
}


/* transiton */
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


</style>