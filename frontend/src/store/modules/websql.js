import axios from 'axios'
import answerJson from '../../assets/answers/answers.json'

const URL = 'http://k5a106.p.ssafy.io:8000'
// const URL = 'http://127.0.0.1:8000'

const state = {
  stage1: {
    lv0: [],
    lv1: ['ROOM'],
    lv2: [],
    schema: [
      {'ROOM': ['id', 'name', 'sort']}
    ],
  },
  stage2: {
    lv0: [],
    lv1: ['POTION'],
    lv2: [],
    lv3: ['POTION'],
    lv4: [],
    lv5: ['POTION'],
    lv6: ['POCKET'],
    lv7: ['POTION'],
    lv8: ['POTION'],
    lv9: ['POCKET'],
    schema: [
      {'POTION': ['id', 'scent', 'size', 'is_left']},
      {'POCKET': ['id', 'product', 'amount']}
    ]
  },
  stage3: {
    lv0: [],
    lv1: ['NEIGHBOR', 'PARTYATTENDEE'],
    lv2: ['MENU', 'KITCHEN'],
    lv3: ['MENU', 'KITCHEN'],
    lv4: ['KITCHEN'],
    lv5: ['NEIGHBOR'],
    lv6: ['MENU', 'KITCHEN', 'PARTYATTENDEE'],
    schema: [
      {'KITCHEN': ['id', 'name', 'sort', 'partytable', 'ingredient', 'quantity']},
      {'MENU': ['id', 'name', 'sort', 'partytable', 'ingredient']},
      {'NEIGHBOR': ['id', 'name', 'sort', 'nap']},
      {'PARTYATTENDEE': ['id', 'partytable']}
    ]
  },
  stage4: {
    lv0: [],
    lv1: ['CLOVERSOLDIER', 'DIAMONDSOLDIER', 'HEARTSOLDIER', 'SPADESOLDIER'],
    lv2: ['CLOVERSOLDIER', 'DIAMONDSOLDIER', 'HEARTSOLDIER', 'SPADESOLDIER'],
    lv3: ['SCOREBOARD'],
    lv4: ['ROSE', 'ROSEINFO'],
    schema: [
      {'CLOVERSOLDIER': ['id', 'shape', 'number', 'letter', 'strength']},
      {'DIAMONDSOLDIER': ['id', 'shape', 'number', 'letter', 'strength']},
      {'HEARTSOLDIER': ['id', 'shape', 'number', 'letter', 'strength']},
      {'SPADESOLDIER': ['id', 'shape', 'number', 'letter', 'strength']},
      {'SCOREBOARD': ['id', 'name', 'hole', 'score']},
      {'ROSE': ['id', 'paint', 'beauty']},
      {'ROSEINFO': ['id', 'color', 'size']}
    ]
  },
  currentStage: 'stage0',
  currentLevel: '0',
  tableSchema: [],
  query: ' ',
  queryResult: [{}],
  submittedResult: [],
  startStageNum: false
}

const getters = {
  resultTable(state) {
    let table = ''
    const columns = Object.keys(state.queryResult[0])
    columns.forEach(column => table += `<th>${column.toLowerCase()}</th>`)
    state.queryResult.forEach(row => {
      table += '<tr>'
      columns.forEach(column => table += `<td>${row[column]}</td>`)
      table += '</tr>'
    })
    return table
  },
  // 정답여부 확인
  isAnswer: state => {
    const split_query = state.query.split(' ')
    const a2 = JSON.parse(JSON.stringify(state.queryResult))
    const a1 = answerJson[0][state.currentStage][0][state.currentLevel]

    if (split_query[0].toLowerCase() === 'insert') {
      if (state.currentStage === 'stage2' && state.currentLevel === 6) {
        const db = openDatabase(state.currentStage, '1.0', '', 2*1024*1024)
        const getResult = () => {
          return new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql('select * from pocket where product=("key")', [],
                (tx, result) => {
                  resolve(result)
                },
                (tx, result) => {
                  reject(result)
                })
            })
          })
        }
        if (getResult()
        .then(res => {
          console.log(res.rows)
          console.log('---1')
          return true
        })
        .catch(res => {
          console.log(res.message)
          return false
        })) {
          console.log('---2')
          return true
        }
        // else {
        //   return false
        // }
      }
    }

    else if (split_query[0].toLowerCase() === 'delete') {
      if (state.currentStage === 'stage2' && state.currentLevel === 9) {
        const db = openDatabase(state.currentStage, '1.0', '', 2*1024*1024)
        const getResult = () => {
          return new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql('select * from pocket where product=("key")', [],
                (tx, result) => {
                  resolve(result)
                },
                (tx, result) => {
                  reject(result)
                })
            })
          })
        }
        if (getResult()
        .then(res => {
          // console.log(res.rows)
          // return false
        })
        .catch(res => {
          console.log(res.message)
          console.log('---3')
          return true
        })) {
          console.log('---4')
          return true
        }
        // else {
        //   return false
        // }
      }
    }

    else if (split_query[0].toLowerCase() === 'create') {
      let targetQuery = split_query.join('').replace(/(\s*)/g, "").toUpperCase()
      console.log(targetQuery)
      if (targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR(255))'
        || targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR(255));'
        || targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR)'
        || targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR);') {
        console.log('---5')
        return true
      }
      // return false
    }

    else {
      console.log('here i am')
      if (a1.length === a2.length) {

        for (const idx in a1) {
          for (const key of Object.keys(a1[idx])){
            // console.log(key)
            // console.log(a1[idx])
            // console.log(a2[idx])

            let A = a1[idx][key]
            let B = a2[idx][key.toUpperCase()]
            if (!B) {
              B = a2[idx][key.toLowerCase()]
            }
            // console.log(a2)
            // console.log(A, B)

            if (A === 'true') A = 1
            if (A === 'false') A = 0

            if (!B) return false
            if (A !== B) return false

          }
        }
        console.log('-----6')
        return true
      }
    }
    return false
  }

}

const mutations = {
  SET_QUERY_RESULT(state, result) {
    state.queryResult = result
  },
  SET_TABLE_SCHEMA(state, schema) {
    state.tableSchema = schema
  },
  SET_CURRENT_STAGE(state, stage) {
    state.currentStage = stage
  },
  SET_CURRENT_LEVEL(state, level) {
    state.currentLevel = level
  },
  SET_SUBMITTED_RESULT(state, result) {
    state.submittedResult = result
  },
  CALL_START_STAGE_NUM(state) {
    state.startStageNum = true
  },
  SET_QUERY(state, query) {
    state.query = query
  }

}

const actions = {
    databaseReset: function () {
      const stage1 = openDatabase('stage1', '1.0', '', 2*1024*1024)
      const stage2 = openDatabase('stage2', '1.0', '', 2*1024*1024)
      const stage3 = openDatabase('stage3', '1.0', '', 2*1024*1024)
      const stage4 = openDatabase('stage4', '1.0', '', 2*1024*1024)

      stage1.transaction(function (tx) {
        tx.executeSql('DROP TABLE ROOM', [])
        tx.executeSql('DROP TABLE IF EXISTS SQLAND', [])
      })
      stage2.transaction(function (tx) {
        tx.executeSql('DROP TABLE POTION', [])
        tx.executeSql('DROP TABLE POCKET', [])
      })
      stage3.transaction(function(tx) {
        tx.executeSql('DROP TABLE NEIGHBOR', [])
        tx.executeSql('DROP TABLE MENU', [])
        tx.executeSql('DROP TABLE PARTYATTENDEE', [])
        tx.executeSql('DROP TABLE KITCHEN', [])
      })
      stage4.transaction(function (tx) {
        tx.executeSql('DROP TABLE SPADESOLDIER', [])
        tx.executeSql('DROP TABLE HEARTSOLDIER', [])
        tx.executeSql('DROP TABLE CLOVERSOLDIER', [])
        tx.executeSql('DROP TABLE DIAMONDSOLDIER', [])
        tx.executeSql('DROP TABLE POCKET', [])
        tx.executeSql('DROP TABLE SCOREBOARD', [])
        tx.executeSql('DROP TABLE ROSEINFO', [])
        tx.executeSql('DROP TABLE ROSE', [])
      })
    },

    databaseResetStage1: function () {
      console.log('setting stage1')
      const db = openDatabase('stage1', '1.0', '', 2*1024*1024)
      axios({
        method: 'get',
        url: `${URL}/api/v1/reset/1`
      })
      .then (res => {
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE ROOM (ID, NAME, SORT)')
          for (const i in res.data) {
            tx.executeSql('insert into room(ID, NAME, SORT) values(?,?,?)', [res.data[i].id, res.data[i].name, res.data[i].sort])
          }
        })
      })
    },

    databaseResetStage2: function () {
      const db = openDatabase('stage2', '1.0', '', 2*1024*1024)
      axios({
        method: 'get',
        url: `${URL}/api/v1/reset/2`
      })
      .then (res => {
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE POTION (ID, SCENT, SIZE, IS_LEFT)')
          tx.executeSql('CREATE TABLE POCKET (ID, PRODUCT, AMOUNT)')
          for (const i in res.data.potion) {
            tx.executeSql('insert into potion(id, scent, size, is_left) values(?,?,?,?)', [res.data.potion[i].id, res.data.potion[i].scent, res.data.potion[i].size, (res.data.potion[i].is_left == true) ? 1 : 0])
          }
          for (const i in res.data.pocket) {
            tx.executeSql('insert into pocket(id, product, amount) values(?,?,?)', [res.data.porcket[i].id, res.data.pocket[i].product, res.data.pocket[i].amount])
          }
        })
      })
    },

    databaseResetStage3: function () {
      const db = openDatabase('stage3', '1.0', '', 2*1024*1024)
      axios({
        method: 'get',
        url: `${URL}/api/v1/reset/3`
      })
      .then (res => {
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE NEIGHBOR (ID, NAME, SORT, NAP)')
          tx.executeSql('CREATE TABLE MENU (ID, NAME, SORT, PARTYTABLE, INGREDIENT)')
          tx.executeSql('CREATE TABLE PARTYATTENDEE (ID, PARTYTABLE)')
          tx.executeSql('CREATE TABLE KITCHEN (ID, NAME, PARTYTABLE, SORT, QUANTITY, INGREDIENT)')
          for (const i in res.data.neighbor) {
            tx.executeSql('insert into neighbor(id, name, sort, nap) values(?,?,?,?)', [res.data.neighbor[i].id, res.data.neighbor[i].name, res.data.neighbor[i].sort, res.data.neighbor[i].nap])
          }
          for (const i in res.data.menu) {
            tx.executeSql('insert into menu(id, name, sort, partytable, ingredient) values(?,?,?,?,?)', [res.data.menu[i].id, res.data.menu[i].name, res.data.menu[i].sort, res.data.menu[i].table, res.data.menu[i].ingredient])
          }
          for (const i in res.data.partyattendee) {
            tx.executeSql('insert into partyattendee(id, partytable) values(?,?)', [res.data.partyattendee[i].id, res.data.partyattendee[i].table])
          }
          for (const i in res.data.kitchen) {
            tx.executeSql('insert into kitchen(id, name, partytable, sort, quantity, ingredient) values(?,?,?,?,?,?)', [res.data.kitchen[i].id, res.data.kitchen[i].name, res.data.kitchen[i].table, res.data.kitchen[i].sort, res.data.kitchen[i].quantity, res.data.kitchen[i].ingredient])
          }
        })
      })
    },

    databaseResetStage4: function () {
      const db = openDatabase('stage4', '1.0', '', 2*1024*1024)
      axios({
        method: 'get',
        url: `${URL}/api/v1/reset/4`
      })
      .then (res => {
        db.transaction(function (tx) {
          tx.executeSql('CREATE TABLE SPADESOLDIER (ID, SHAPE, NUMBER, STRENGTH, LETTER)')
          tx.executeSql('CREATE TABLE HEARTSOLDIER (ID, SHAPE, NUMBER, STRENGTH, LETTER)')
          tx.executeSql('CREATE TABLE CLOVERSOLDIER (ID, SHAPE, NUMBER, STRENGTH, LETTER)')
          tx.executeSql('CREATE TABLE DIAMONDSOLDIER (ID, SHAPE, NUMBER, STRENGTH, LETTER)')
          tx.executeSql('CREATE TABLE POCKET (ID, PRODUCT, AMOUNT)')
          tx.executeSql('CREATE TABLE SCOREBOARD (ID, NAME, HOLE, SCORE)')
          tx.executeSql('CREATE TABLE ROSEINFO (ID, COLOR, SIZE)')
          tx.executeSql('CREATE TABLE ROSE (ID, PAINT, BEAUTY)')
          for (const i in res.data.spadesoldier) {
            tx.executeSql('insert into spadesoldier(id, shape, number, strength, letter) values(?,?,?,?,?)', [res.data.spadesoldier[i].id, res.data.spadesoldier[i].shape, res.data.spadesoldier[i].number, res.data.spadesoldier[i].strength, res.data.spadesoldier[i].letter])
          }
          for (const i in res.data.heartsoldier) {
            tx.executeSql('insert into heartsoldier(id, shape, number, strength, letter) values(?,?,?,?,?)', [res.data.heartsoldier[i].id, res.data.heartsoldier[i].shape, res.data.heartsoldier[i].number, res.data.heartsoldier[i].strength, res.data.heartsoldier[i].letter])
          }
          for (const i in res.data.cloversoldier) {
            tx.executeSql('insert into cloversoldier(id, shape, number, strength, letter) values(?,?,?,?,?)', [res.data.cloversoldier[i].id, res.data.cloversoldier[i].shape, res.data.cloversoldier[i].number, res.data.cloversoldier[i].strength, res.data.cloversoldier[i].letter])
          }
          for (const i in res.data.diamondsoldier) {
            tx.executeSql('insert into diamondsoldier(id, shape, number, strength, letter) values(?,?,?,?,?)', [res.data.diamondsoldier[i].id, res.data.diamondsoldier[i].shape, res.data.diamondsoldier[i].number, res.data.diamondsoldier[i].strength, res.data.diamondsoldier[i].letter])
          }
          for (const i in res.data.pocket) {
            tx.executeSql('insert into pocket(id, product, amount) values(?,?,?)', [res.data.pocket[i].id, res.data.pocket[i].product, res.data.pocket[i].amount])
          }
          for (const i in res.data.scoreboard) {
            tx.executeSql('insert into scoreboard(id, name, hole, score) values(?,?,?,?)', [res.data.scoreboard[i].id, res.data.scoreboard[i].name, res.data.scoreboard[i].hole, res.data.scoreboard[i].score])
          }
          for (const i in res.data.roseinfo) {
            tx.executeSql('insert into roseinfo(id, color, size) values(?,?,?)', [res.data.roseinfo[i].id, res.data.roseinfo[i].color, res.data.roseinfo[i].size])
          }
          for (const i in res.data.rose) {
            tx.executeSql('insert into rose(id, paint, beauty) values(?,?,?)', [res.data.rose[i].id, res.data.rose[i].paint, res.data.rose[i].beauty])
          }
        })
      })
    },

    getQuery: function ({commit, dispatch}, {query, stage, problemNumber}) {

      commit('SET_QUERY', query)
      let query_split = query.split(' ')

      const db = openDatabase(stage, '1.0', '', 2*1024*1024)
      const doSQL = () => {
        return new Promise((resolve, reject) => {
          db.transaction(tx => {
            tx.executeSql(query, [],
              (tx, result) => {
                resolve(result)
              },
              (tx, result) => {
                reject(result)
              })
          })
        })
      }
      doSQL()
      .then((res) => {
        console.log(res.rows)
        if (query_split[0].toLowerCase() == 'select') {
          let resultTable = []
          for (let i=0; i < res.rows.length; i++) {
            const row = res.rows.item(i);
            resultTable.push(row)
          }
          commit('SET_QUERY_RESULT', resultTable)
        }
        else {
          const tables = ['ROOM', 'POCKET', 'POTION', 'KITCHEN', 'MENU', 'NEIGHBOR', 'PARTYATTENDEE', 'CLOVERSOLDIER', 'DIAMONDSOLDIER', 'HEARTSOLDIER', 'SPADESOLDIER', 'SCOREBOARD', 'ROSE', 'ROSEINFO']
          let resultTable = []
          let targetTable = ''
          for (let i=0; i<(query_split).length; i++) {
            for (let table of tables) {
              if (query_split[i].toUpperCase() === table) {
                targetTable = table
                break
              }
              if (targetTable) break
            }
          }
          console.log(targetTable)
          let resultquery = `select * from ${targetTable};`
          const doResultSQL = () => {
            return new Promise((resolve, reject) => {
              db.transaction(tx => {
                tx.executeSql(resultquery, [],
                  (tx, result) => {
                    resolve(result)
                  },
                  (tx, result) => {
                    reject(result)
                  })
              })
            })
          }
          doResultSQL()
          .then((res) => {
            console.log(res.rows)
            for (let i=0; i<res.rows.length; i++) {
              const row = res.rows.item(i)
              resultTable.push(row)
            }
            commit('SET_QUERY_RESULT', resultTable)
          })
          .catch((res) => {
            console.log(res.message)
            commit('SET_QUERY_RESULT', resultTable)
          })

          console.log(res)
          console.log(`${res.rowsAffected} row(s) affected.`)
        }
      })
      .then((res) => {
        const split_query = query.split(' ')
        const a2 = JSON.parse(JSON.stringify(state.queryResult))
        const a1 = answerJson[0][stage][0][problemNumber]
        console.log(a1)
        console.log(a2)

        if (split_query[0].toLowerCase() === 'insert') {
          if (stage === 'stage2' && problemNumber === '4') {
            const db = openDatabase(stage, '1.0', '', 2*1024*1024)
            const getResult = () => {
              return new Promise((resolve, reject) => {
                db.transaction(tx => {
                  tx.executeSql('select * from pocket where product=("key")', [],
                    (tx, result) => {
                      resolve(result)
                    },
                    (tx, result) => {
                      reject(result)
                    })
                })
              })
            }
            if (getResult()
            .then(res => {
              console.log(res.rows)
              return true
            })
            .catch(res => {
              console.log(res.message)
              return false
            })) {
              return true
            }
            else {
              return false
            }
          }
        }

        else if (split_query[0].toLowerCase() === 'delete') {
          if (stage === 'stage2' && problemNumber === '7') {
            const db = openDatabase(stage, '1.0', '', 2*1024*1024)
            const getResult = () => {
              return new Promise((resolve, reject) => {
                db.transaction(tx => {
                  tx.executeSql('select * from pocket where product=("key")', [],
                    (tx, result) => {
                      resolve(result)
                    },
                    (tx, result) => {
                      reject(result)
                    })
                })
              })
            }
            if (getResult()
            .then(res => {
              console.log(res.rows)
              return false
            })
            .catch(res => {
              console.log(res.message)
              return true
            })) {
              return true
            }
            else {
              return false
            }
          }
        }

        else if (split_query[0].toLowerCase() === 'create') {
          let targetQuery = split_query.join('').replace(/(\s*)/g, "").toUpperCase()
          console.log(targetQuery)
          if (targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR(255))' || targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR(255));') {
            return true
          }
          return false
        }

        else {
          if (a1.length !== a2.length) {
            return false
          }

          for (const idx in a1) {
            for (const key of Object.keys(a1[idx])){

              let A = a1[idx][key]
              let B = a2[idx][key.toUpperCase()]

              if (A === 'true') A = 1
              if (A === 'false') A = 0
              if (!B) return false
              if (A !== B) return false

            }
          }

          return true
        }
      })
      .catch((res) => {
        console.log(res.message)
        let error = [{error: res.message}]
        commit('SET_QUERY_RESULT', error)
      })
    },
  
  checkAnswer({commit}, {query, stage, problemNumber}) {
    const split_query = query.split(' ')
    const a2 = JSON.parse(JSON.stringify(state.queryResult))
    const a1 = answerJson[0][stage][0][problemNumber]

    if (split_query[0].toLowerCase() === 'insert') {
      if (stage === 'stage2' && problemNumber === '4') {
        const db = openDatabase(stage, '1.0', '', 2*1024*1024)
        const getResult = () => {
          return new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql('select * from pocket where product=("key")', [],
                (tx, result) => {
                  resolve(result)
                },
                (tx, result) => {
                  reject(result)
                })
            })
          })
        }
        if (getResult()
        .then(res => {
          console.log(res.rows)
          return true
        })
        .catch(res => {
          console.log(res.message)
          return false
        })) {
          return true
        }
        else {
          return false
        }
      }
    }
    
    else if (split_query[0].toLowerCase() === 'delete') {
      if (stage === 'stage2' && problemNumber === '7') {
        const db = openDatabase(stage, '1.0', '', 2*1024*1024)
        const getResult = () => {
          return new Promise((resolve, reject) => {
            db.transaction(tx => {
              tx.executeSql('select * from pocket where product=("key")', [],
                (tx, result) => {
                  resolve(result)
                },
                (tx, result) => {
                  reject(result)
                })
            })
          })
        }
        if (getResult()
        .then(res => {
          console.log(res.rows)
          return false
        })
        .catch(res => {
          console.log(res.message)
          return true
        })) {
          return true
        }
        else {
          return false
        }
      }
    }

    else if (split_query[0].toLowerCase() === 'create') {
      let targetQuery = split_query.join('').replace(/(\s*)/g, "").toUpperCase()
      console.log(targetQuery)
      if (targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR(255))' || targetQuery === 'CREATETABLESQLAND(STAGEINT,LEVELINT,RESIDENTVARCHAR(255));') {
        return true
      }
      return false
    }

    else {
      if (a1.length !== a2.length) {
        return false
      }
  
      for (const idx in a1) {
        for (const key of Object.keys(a1[idx])){
          // console.log(key)
          // console.log(a1[idx])
          // console.log(a2[idx])
  
          let A = a1[idx][key]
          let B = a2[idx][key.toUpperCase()]
          // console.log(a2)
          // console.log(A, B)
  
          if (A === 'true') A = 1
          if (A === 'false') A = 0
   
          if (!B) return false
          if (A !== B) return false
          
        }
      }

      return true
    }

  },

  // 스테이지별 테이블 스키마 설정
  setStage1({state, commit}, level) {
    const schemaArray = []
    state.stage1.schema.forEach(each => {
      if (state.stage1[level].includes(Object.keys(each)[0])) {
        schemaArray.push(each)
      }
    })
    commit('SET_TABLE_SCHEMA', schemaArray)
  },
  setStage2({state, commit}, level) {
    const schemaArray = []
    state.stage2.schema.forEach(each => {
      if (state.stage2[level].includes(Object.keys(each)[0])) {
        schemaArray.push(each)
      }
    })
    commit('SET_TABLE_SCHEMA', schemaArray)
  },
  setStage3({state, commit}, level) {
    const schemaArray = []
    state.stage3.schema.forEach(each => {
      if (state.stage3[level].includes(Object.keys(each)[0])) {
        schemaArray.push(each)
      }
    })
    commit('SET_TABLE_SCHEMA', schemaArray)
  },
  setStage4({state, commit}, level) {
    const schemaArray = []
    state.stage4.schema.forEach(each => {
      if (state.stage4[level].includes(Object.keys(each)[0])) {
        schemaArray.push(each)
      }
    })
    commit('SET_TABLE_SCHEMA', schemaArray)
  },

  // 현재 문제 정보 저장
  setCurrentStage({commit}, stage) {
    commit('SET_CURRENT_STAGE', stage)
  },
  setCurrentLevel({commit}, lv) {
    commit('SET_CURRENT_LEVEL', lv)
  },

  // 결과 테이블 초기화
  resetResultTable({commit}) {
      commit('SET_QUERY_RESULT', [{}])
  },

  // 로딩페이지에서 쿠키에 저장된 스테이지 정보 전송
  callStartStageNum({commit}) {
    commit('CALL_START_STAGE_NUM')
  }


}

export default {
  state, getters, mutations, actions
}