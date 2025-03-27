<template>
  <div id="app">  <!-- Важно совпадение с mount('#app') -->
    <router-view/>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
}

button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 5px;
}

button:hover {
  background-color: #45a049;
}

a {
  color: #4CAF50;
  text-decoration: none;
  margin: 5px;
}

a:hover {
  text-decoration: underline;
}

@media (max-width: 600px) {
  .game-header {
    flex-wrap: wrap;
  }
  
  .cell {
    width: 25px;
    height: 25px;
    font-size: 12px;
  }
}
</style>