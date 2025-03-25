<template>
  <div>
    <button @click="copyLink">Share</button>
    <div v-if="showConfirmation" class="confirmation">Link copied!</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const showConfirmation = ref(false)

function copyLink() {
  const url = window.location.href
  navigator.clipboard.writeText(url).then(() => {
    showConfirmation.value = true
    setTimeout(() => {
      showConfirmation.value = false
    }, 2000)
  })
}
</script>

<style>
.confirmation {
  color: green;
  font-size: 0.9em;
  margin-top: 5px;
}
</style>
