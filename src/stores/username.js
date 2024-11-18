import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const usernameStore = defineStore(
  'username',
  () => {
    const username = ref(null)
    function setName(name) {
      username.value = name
    }

    return { username, setName }
  },
  {
    persist: {
      key: 'username',
      path: 'username'
    }
  }
)