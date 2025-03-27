<template>
    <div class="game-container">
      <div class="game-header">
        <button class="restart-btn" @click="restartGame">↻</button>
        <Timer :isRunning="isGameRunning" @time-update="updateTime" />
        <router-link to="/">Настройки</router-link>
      </div>
      
      <div class="board" :style="boardStyle">
        <div 
          v-for="(row, rowIndex) in board" 
          :key="rowIndex" 
          class="row"
        >
          <div 
            v-for="(cell, colIndex) in row" 
            :key="colIndex"
            class="cell"
            :class="[
              cell.isRevealed ? 'revealed' : 'hidden',
              cell.isMine && cell.isRevealed ? 'mine' : '',
              cell.flag === 'flag' ? 'flagged' : '',
              cell.flag === 'question' ? 'question' : ''
            ]"
            @click.left="revealCell(rowIndex, colIndex)"
            @click.right.prevent="toggleFlag(rowIndex, colIndex)"
            @click.middle="handleMiddleClick(rowIndex, colIndex)"
          >
            <span 
              v-if="cell.isRevealed && cell.adjacentMines > 0 && !cell.isMine"
              :class="`number-${cell.adjacentMines}`"
            >
              {{ cell.adjacentMines }}
            </span>
            <span v-if="cell.isMine && cell.isRevealed">💣</span>
            <span v-if="cell.flag === 'flag' && !cell.isRevealed">🚩</span>
            <span v-if="cell.flag === 'question' && !cell.isRevealed">?</span>
          </div>
        </div>
      </div>

      <div class="mines-counter">{{ minesLeft }}</div>

      <div v-if="gameOver" class="game-over">
        <h2>{{ gameWon ? 'Победа!' : 'Поражение!' }}</h2>
        <button @click="restartGame">Играть снова</button>
        <router-link to="/">Настройки</router-link>
        <button v-if="gameWon" @click="saveResult">Сохранить результат</button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue'
  import { useGameStore } from '@/stores/gameStore'
  import { useRouter } from 'vue-router'
  import Timer from './GameTimer.vue'
  
  const store = useGameStore()
  const router = useRouter()
  
  const board = ref([])
  const isGameRunning = ref(false)
  const gameOver = ref(false)
  const gameWon = ref(false)
  const minesLeft = ref(0)
  const currentTime = ref(0)
  
  const boardStyle = computed(() => {
    return {
      'grid-template-columns': `repeat(${store.boardSize.cols}, 30px)`,
      'grid-template-rows': `repeat(${store.boardSize.rows}, 30px)`
    }
  })
  
  // Инициализация игры
  const initializeGame = () => {
    gameOver.value = false
    gameWon.value = false
    isGameRunning.value = false
    minesLeft.value = store.mines
    currentTime.value = 0
    
    // Создаем пустое поле
    board.value = Array(store.boardSize.rows).fill().map(() => 
      Array(store.boardSize.cols).fill().map(() => ({
        isMine: false,
        isRevealed: false,
        adjacentMines: 0,
        flag: null
      }))
    )
  }
  
  // Генерация мин после первого хода
  const generateMines = (firstClickRow, firstClickCol) => {
    let minesPlaced = 0
    const rows = store.boardSize.rows
    const cols = store.boardSize.cols
    
    // Гарантируем, что первая клетка и соседние не содержат мин
    const safeCells = []
    for (let r = Math.max(0, firstClickRow - 1); r <= Math.min(rows - 1, firstClickRow + 1); r++) {
      for (let c = Math.max(0, firstClickCol - 1); c <= Math.min(cols - 1, firstClickCol + 1); c++) {
        safeCells.push(`${r},${c}`)
      }
    }
    
    while (minesPlaced < store.mines) {
      const row = Math.floor(Math.random() * rows)
      const col = Math.floor(Math.random() * cols)
      
      if (!safeCells.includes(`${row},${col}`) && !board.value[row][col].isMine) {
        board.value[row][col].isMine = true
        minesPlaced++
      }
    }
    
    // Подсчет мин вокруг каждой клетки
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        if (!board.value[row][col].isMine) {
          let count = 0
          for (let r = Math.max(0, row - 1); r <= Math.min(rows - 1, row + 1); r++) {
            for (let c = Math.max(0, col - 1); c <= Math.min(cols - 1, col + 1); c++) {
              if (board.value[r][c].isMine) count++
            }
          }
          board.value[row][col].adjacentMines = count
        }
      }
    }
  }
  
  // Открытие клетки
  const revealCell = (row, col) => {
    if (gameOver.value || board.value[row][col].isRevealed || board.value[row][col].flag === 'flag') return
    
    // Первый ход - генерируем мины
    if (!isGameRunning.value) {
      isGameRunning.value = true
      generateMines(row, col)
    }
    
    if (board.value[row][col].isMine) {
      // Игрок наступил на мину
      board.value[row][col].isRevealed = true
      revealAllMines()
      gameOver.value = true
      isGameRunning.value = false
      return
    }
    
    // Открытие пустых клеток
    const reveal = (r, c) => {
      if (r < 0 || r >= store.boardSize.rows || c < 0 || c >= store.boardSize.cols || 
          board.value[r][c].isRevealed || board.value[r][c].flag === 'flag') {
        return
      }
      
      board.value[r][c].isRevealed = true
      
      if (board.value[r][c].adjacentMines === 0) {
        for (let i = Math.max(0, r - 1); i <= Math.min(store.boardSize.rows - 1, r + 1); i++) {
          for (let j = Math.max(0, c - 1); j <= Math.min(store.boardSize.cols - 1, c + 1); j++) {
            if (i !== r || j !== c) {
              reveal(i, j)
            }
          }
        }
      }
    }
    
    reveal(row, col)
    
    // Проверка победы
    checkWin()
  }
  
  // Установка/смена флажка
  const toggleFlag = (row, col) => {
    if (gameOver.value || board.value[row][col].isRevealed) return
    
    const cell = board.value[row][col]
    if (!cell.flag) {
      cell.flag = 'flag'
      minesLeft.value--
    } else if (cell.flag === 'flag') {
      cell.flag = 'question'
      minesLeft.value++
    } else {
      cell.flag = null
    }
    
    // Проверка победы
    checkWin()
  }
  
  // Обработка средней кнопки мыши
  const handleMiddleClick = (row, col) => {
    if (!board.value[row][col].isRevealed || board.value[row][col].adjacentMines === 0) return
    
    const cell = board.value[row][col]
    const flaggedAround = countFlagsAround(row, col)
    
    if (flaggedAround === cell.adjacentMines) {
      // Открываем все неотмеченные клетки вокруг
      for (let r = Math.max(0, row - 1); r <= Math.min(store.boardSize.rows - 1, row + 1); r++) {
        for (let c = Math.max(0, col - 1); c <= Math.min(store.boardSize.cols - 1, col + 1); c++) {
          if ((r !== row || c !== col) && !board.value[r][c].flag) {
            revealCell(r, c)
          }
        }
      }
    }
  }
  
  // Подсчет флагов вокруг клетки
  const countFlagsAround = (row, col) => {
    let count = 0
    for (let r = Math.max(0, row - 1); r <= Math.min(store.boardSize.rows - 1, row + 1); r++) {
      for (let c = Math.max(0, col - 1); c <= Math.min(store.boardSize.cols - 1, col + 1); c++) {
        if (board.value[r][c].flag === 'flag') count++
      }
    }
    return count
  }
  
  // Проверка победы
  const checkWin = () => {
    let allNonMinesRevealed = true
    let allMinesFlagged = true
    
    for (let row = 0; row < store.boardSize.rows; row++) {
      for (let col = 0; col < store.boardSize.cols; col++) {
        const cell = board.value[row][col]
        if (!cell.isMine && !cell.isRevealed) {
          allNonMinesRevealed = false
        }
        if (cell.isMine && cell.flag !== 'flag') {
          allMinesFlagged = false
        }
      }
    }
    
    if (allNonMinesRevealed || allMinesFlagged) {
      gameWon.value = true
      gameOver.value = true
      isGameRunning.value = false
    }
  }
  
  // Открытие всех мин при проигрыше
  const revealAllMines = () => {
    for (let row = 0; row < store.boardSize.rows; row++) {
      for (let col = 0; col < store.boardSize.cols; col++) {
        if (board.value[row][col].isMine) {
          board.value[row][col].isRevealed = true
        }
      }
    }
  }
  
  // Обновление времени
  const updateTime = (time) => {
    currentTime.value = time
  }
  
  // Перезапуск игры
  const restartGame = () => {
    initializeGame()
  }
  
  // Сохранение результата
  const saveResult = () => {
    const name = prompt('Введите ваше имя для таблицы лидеров:')
    if (name) {
      store.addToLeaderboard({
        name,
        time: currentTime.value,
        difficulty: store.difficulty,
        date: new Date().toLocaleDateString()
      })
      router.push('/leaderboard')
    }
  }
  
  onMounted(() => {
    initializeGame()
  })
  </script>
  
  <style scoped>
  .game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
  }
  
  .game-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
    max-width: 600px;
  }
  
  .board {
    display: grid;
    gap: 2px;
    margin-bottom: 20px;
  }
  
  .row {
    display: contents;
  }
  
  .cell {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    cursor: pointer;
    user-select: none;
  }
  
  .hidden {
    background-color: #ccc;
    border: 2px outset #eee;
  }
  
  .hidden:hover {
    background-color: #ddd;
  }
  
  .revealed {
    background-color: #eee;
    border: 1px solid #999;
  }
  
  .mine {
    background-color: #f00;
  }
  
  .flagged {
    background-color: #f99;
  }
  
  .number-1 { color: blue; }
  .number-2 { color: green; }
  .number-3 { color: red; }
  .number-4 { color: darkblue; }
  .number-5 { color: brown; }
  .number-6 { color: teal; }
  .number-7 { color: black; }
  .number-8 { color: white; }
  
  .game-over {
    text-align: center;
    margin-top: 20px;
  }
  
  .restart-btn {
    font-size: 20px;
    padding: 5px 10px;
    cursor: pointer;
    margin-right: 50px;
  }
  </style>