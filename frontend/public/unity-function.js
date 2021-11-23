
function UnityResize() {
  let isEditor = window.app.$children[0].$children[0].isEditor

  if (isEditor) {
    window.app.$children[0].$children[0].isEditor = false
    window.app.$children[0].$children[0].unityWidth = '100%'
  } else {
    window.app.$children[0].$children[0].isEditor = true
    window.app.$children[0].$children[0].unitywidth = '60%'
  }
}

function tongsin(stage, lv) {
  const vm = window.app

  // 전 레벨 클리어
  if (stage === 4 && lv === 5) {
    vm.$router.push('/complete')
  }

  else {
    vm.$store.dispatch.prototype.constructor(`setStage${stage}`, `lv${lv}`)
    vm.$store.dispatch.prototype.constructor('setCurrentStage', `stage${stage}`)
    vm.$store.dispatch.prototype.constructor('setCurrentLevel', lv)
    vm.$store.dispatch.prototype.constructor('resetResultTable')
  }
}

function getStartStageNum() {
  const vm = window.app
  vm.$store.dispatch.prototype.constructor('callStartStageNum', true)
}