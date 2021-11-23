<template>
  <div>
    <h1>Editor</h1>
    <textarea v-model="editorText" @keyup.tab="addTab" wrap="soft" autocapitalize="off" spellcheck="false"></textarea>
    <div contenteditable="true" id="editor-text"></div>
    <!--<textarea name="" id="editor-text" cols="30" rows="10" @keypress="textToSpan"></textarea>-->
  </div>
</template>

<script>
export default {
  name: "Editor",
  data() {
    return {
      editorText: ''
    }
  },
  methods: {
    addTab() {
      console.log('adding tab')
      const editor = document.querySelector('#editor-text')

      editor.innerHTML += "<span>&nbsp; &nbsp; </span>"
    },
    textToSpan() {

      console.log('methods ')
      const editorDiv = document.querySelector('#editor-text')

      const text = this.editorText.match(/[a-z]+|[0-9]+|[^a-z&^0-9]+/gi)
      let result = ""

      const reserved = ['ADD', 'ALL', 'ALTER', 'ANALYZE', 'AND', 'AS', 'ASC', 'ASENSITIVE',
      'BEFORE', 'BETWEEN', 'BIGINT', 'BINARY', 'BLOB', 'BOTH', 'BY',
      'CALL', 'CASCADE', 'CASE', 'CHANGE', 'CHAR', 'CHARACTER', 'CHECK', 'COLLATE', 'COLUMN', 'CONDITION',
      'CONSTRAINT', 'CONTINUE', 'CONVERT', 'CREATE', 'CROSS', 'CURRENT_DATE', 'CURRENT_TIME', 'CURRENT_TIMESTAMP', 'CURRENT_USER', 'CURSOR',
      'DATABASE','DATABASES', 'DAY_HOUR', 'DAY_MICROSECOND', 'DAY_MINUTE', 'DAY_SECOND', 'DEC', 'DECIMAL', 'DECLARE',
      'DEFAULT', 'DELAYED', 'DELETE', 'DESC', 'DESCRIBE', 'DETERMINISTIC', 'DISTINCT', 'DISTINCTROW', 'DIV', 'DOUBLE', 'DROP', 'DUAL',
      'EACH', 'ELSE', 'ELSEIF', 'ENCLOSED', 'ESCAPED', 'EXISTS', 'EXIT', 'EXPLAIN',
      'FALSE', 'FETCH', 'FLOAT', 'FLOAT4', 'FLOAT8', 'FOR', 'FORCE', 'FOREIGN', 'FROM', 'FULLTEXT',
      'GRANT', 'GROUP',
      'HAVING', 'HIGH_PRIORITY', 'HOUR_MICROSECOND', 'HOUR_MINUTE', 'HOUR_SECOND',
      'IF', 'IGNORE', 'IN', 'INDEX', 'INFILE', 'INNER', 'INOUT', 'INSENSITIVE', 'INSERT', 'INT', 'INT1', 'INT2', 'INT3', 'INT4', 'INT8', 'INTEGER', 'INTERVAL', 'INTO', 'IS', 'ITERATE',
      'JOIN',
      'KEY', 'KEYS', 'KILL', 'LEADING', 'LEAVE', 'LEFT', 'LIKE', 'LIMIT', 'LINES', 'LOAD', 'LOCALTIME', 'LOCALTIMESTAMP', 'LOCK', 'LONG', 'LONGBLOB', 'LONGTEXT', 'LOOP', 'LOW_PRIORITY',
      'MATCH', 'MEDIUMBLOB', 'MEDIUMINT', 'MEDIUMTEXT', 'MIDDLEINT', 'MINUTE_MICROSECOND', 'MINUTE_SECOND', 'MOD', 'MODIFIES',
      'NATURAL', 'NOT', 'NO_WRITE_TO_BINLOG', 'NULL', 'NUMERIC',
      'ON', 'OPTIMIZE', 'OPTION', 'OPTIONALLY', 'OR', 'ORDER', 'OUT', 'OUTER', 'OUTFILE',
      'PRECISION', 'PRIMARY', 'PROCEDURE', 'PURGE',
      'READ', 'READS', 'REAL', 'REFERENCES', 'REGEXP', 'RELEASE', 'RENAME', 'REPEAT', 'REPLACE', 'REQUIRE', 'RESTRICT', 'RETURN', 'REVOKE', 'RIGHT', 'RLIKE',
      'SCHEMA', 'SCHEMAS', 'SECOND_MICROSECOND', 'SELECT', 'SENSITIVE', 'SEPARATOR', 'SET', 'SHOW', 'SMALLINT', 'SONAME', 'SPATIAL', 'SPECIFIC', 'SQL', 'SQLEXCEPTION',
      'SQLSTATE', 'SQLWARNING', 'SQL_BIG_RESULT', 'SQL_CALC_FOUND_ROWS', 'SQL_SMALL_RESULT', 'SSL', 'STARTING', 'STRAIGHT_JOIN', 'TABLE', 'TERMINATED', 'THEN',
      'TINYBLOB', 'TINYINT', 'TINYTEXT', 'TO', 'TRAILING', 'TRIGGER', 'TRUE',
      'UNDO', 'UNION', 'UNIQUE', 'UNLOCK', 'UNSIGNED', 'UPDATE', 'USAGE', 'USE', 'USING', 'UTC_DATE', 'UTC_TIME', 'UTC_TIMESTAMP',
      'VALUES', 'VARBINARY', 'VARCHAR', 'VARCHARACTER', 'VARYING', 'WHEN', 'WHERE', 'WHILE', 'WITH', 'WRITE', 'XOR', 'YEAR_MONTH', 'ZEROFILL']



      text.forEach(function(char){
        let newTag = document.createElement('span')
        newTag.innerText = char

        if (reserved.includes(char.toUpperCase())) {
          // newTag.className = 'keyword'
          result += '<span style="color: red">' + char + "</span>"
        }
        else {
          result += "<span>" + char + "</span>"
        }
      })

      editorDiv.innerHTML = result;

    }
  },
  watch: {
    editorText: function() {
      this.textToSpan()
    }
  }
}
</script>

<style scoped>
  .keyword {

    color: red;
  }
</style>