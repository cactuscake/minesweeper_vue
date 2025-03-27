import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', {
  state: () => ({
    difficulty: 'easy',
    boardSize: { rows: 8, cols: 8 },
    mines: 10,
    leaderboard: JSON.parse(localStorage.getItem('leaderboard')) || []
  }),
  actions: {
    setDifficulty(difficulty) {
      if (difficulty === 'easy') {
        this.boardSize = { rows: 8, cols: 8 }
        this.mines = 10
      } else if (difficulty === 'medium') {
        this.boardSize = { rows: 16, cols: 16 }
        this.mines = 40
      } else if (difficulty === 'hard') {
        this.boardSize = { rows: 16, cols: 32 }
        this.mines = 100
      }
      this.difficulty = difficulty
    },
    addToLeaderboard(entry) {
      this.leaderboard.push(entry)
      this.leaderboard.sort((a, b) => a.time - b.time)
      this.leaderboard = this.leaderboard.slice(0, 10)
      localStorage.setItem('leaderboard', JSON.stringify(this.leaderboard))
    }
  }
})