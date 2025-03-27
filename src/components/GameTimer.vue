<template>
  <div class="timer">{{ formattedTime }}</div>
</template>

<script>
import { computed, ref, watch, onUnmounted } from 'vue'

export default {
  props: {
    isRunning: Boolean
  },
  emits: ['time-update'],
  setup(props, { emit }) {
    const time = ref(0)
    let interval = null

    const formattedTime = computed(() => {
      const minutes = Math.floor(time.value / 60)
      const seconds = time.value % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    })

    watch(() => props.isRunning, (isRunning) => {
      if (isRunning) {
        interval = setInterval(() => {
          time.value++
          emit('time-update', time.value)
        }, 1000)
      } else {
        clearInterval(interval)
      }
    })

    onUnmounted(() => {
      clearInterval(interval)
    })

    return {
      formattedTime
    }
  }
}
</script>

<style scoped>
.timer {
  font-family: monospace;
  font-size: 20px;
}
</style>