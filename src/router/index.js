import { createRouter, createWebHistory } from 'vue-router'
import GameSettings from '@/components/GameSettings.vue'
import Leaderboard from '@/components/GameLeaderboard.vue'
import GameBoard from '@/components/GameBoard.vue'

const routes = [
  { path: '/', component: GameSettings },
  { path: '/game', component: GameBoard },
  { path: '/leaderboard', component: Leaderboard }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router