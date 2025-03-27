<template>
    <div class="settings-container">
      <h1>Сапёр</h1>
      <div class="difficulty-options">
        <button @click="setDifficulty('easy')">Простой (8x8, 10 мин)</button>
        <button @click="setDifficulty('medium')">Средний (16x16, 40 мин)</button>
        <button @click="setDifficulty('hard')">Сложный (32x16, 100 мин)</button>
      </div>
      <button @click="startGame">Начать игру</button>
      <router-link to="/leaderboard">Таблица лидеров</router-link>
    </div>
  </template>
  
  <script setup>
  import { useGameStore } from '@/stores/gameStore'
  import { useRouter } from 'vue-router'
  
  const store = useGameStore()
  const router = useRouter()
  
  const setDifficulty = (level) => {
    store.setDifficulty(level)
  }
  
  const startGame = () => {
    router.push('/game')
  }
  </script>