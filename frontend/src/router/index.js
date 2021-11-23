import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from "@/views/Main";
import SetNickname from "@/views/SetNickname";
import Game from "@/views/Game";
import UnityGame from "@/views/UnityGame";
import Complete from "@/views/Complete";


Vue.use(VueRouter)

const routes = [
  // 시작화면
  {path: '/', name: 'Main', component: Main},
  // 닉네임 설정
  {path: '/nickname', name: 'SetNickname', component: SetNickname},
  // 게임 진행
  {path: '/game', name: 'Game', component: Game},
  {path: '/unitygame', name: 'UnityGame', component: UnityGame},
  // 수료증
  {path: '/complete', name: 'Complete', component: Complete}


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})


export default router