<template>
  <div>
    <div class="table-name">&nbsp;{{Object.keys(content)[0]}}</div>
    <table id="inner-table" v-html="showTable" v-if="content"></table>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: ['content'],
  computed: {
    showTable() {
      let table = ''
      Object.values(this.content)[0].forEach(column => table += `<th>${column}</th>`)
      return table
    }
  },
}
</script>

<style scoped>
::v-deep table {
  background-color: #1E073A;
  margin-left: 5px;
  font-family: 'NEXONFootballGothicLA1';
  width: calc(100% - 10px);
  padding: 2px 0;
  text-align: center;
  border-collapse: collapse;
}

.table-name {
  color: #A1E0FF;
  font-family: 'NEXONFootballGothicLA1';
  margin-top: 0.5vw;
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