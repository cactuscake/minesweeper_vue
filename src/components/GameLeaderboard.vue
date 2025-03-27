<template>
    <div class="leaderboard-container">
      <h1>Таблица лидеров</h1>
      <div class="difficulty-tabs">
        <button 
          v-for="diff in ['easy', 'medium', 'hard']" 
          :key="diff"
          @click="currentDifficulty = diff"
          :class="{ active: currentDifficulty === diff }"
        >
          {{ getDifficultyName(diff) }}
        </button>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Место</th>
            <th>Имя</th>
            <th>Время</th>
            <th>Дата</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in filteredLeaderboard" :key="index">
            <td>{{ index + 1 }}</td>
            <td>{{ entry.name }}</td>
            <td>{{ formatTime(entry.time) }}</td>
            <td>{{ entry.date }}</td>
          </tr>
          <tr v-if="filteredLeaderboard.length === 0">
            <td colspan="4">Нет записей</td>
          </tr>
        </tbody>
      </table>
      
      <router-link to="/">Вернуться к настройкам</router-link>
    </div>
  </template>
  
  <script setup>
  import { computed, ref } from 'vue'
  import { useGameStore } from '@/stores/gameStore'
  
  const store = useGameStore()
  const currentDifficulty = ref('easy')
  
  const filteredLeaderboard = computed(() => {
    return store.leaderboard
      .filter(entry => entry.difficulty === currentDifficulty.value)
      .slice(0, 10)
  })
  
  const getDifficultyName = (diff) => {
    const names = {
      easy: 'Простой',
      medium: 'Средний',
      hard: 'Сложный'
    }
    return names[diff] || diff
  }
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }
  </script>
  
  <style scoped>
  .leaderboard-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
  }
  
  th, td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
  }
  
  th {
    background-color: #f2f2f2;
  }
  
  .difficulty-tabs {
    margin: 20px 0;
  }
  
  .difficulty-tabs button {
    padding: 8px 16px;
    margin-right: 5px;
    cursor: pointer;
  }
  
  .difficulty-tabs button.active {
    background-color: #4CAF50;
    color: white;
  }
  </style>