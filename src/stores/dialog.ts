import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const show = ref(false)
  function openDialog() {
    show.value = true
  }

  function closeDialog() {
    show.value = false
  }

  return { openDialog, closeDialog, show }
})
