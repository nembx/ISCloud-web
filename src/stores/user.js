import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const userStore = defineStore(
  'user',
  () => {
    const accessToken = ref(null)
    const refreshToken = ref(null)
    const imf = computed(() => {
      `hello + ${token}`
    })
    function set(res) {
      accessToken.value = res.data.result.accessToken
      refreshToken.value = res.data.result.refreshToken
    }
    return { accessToken,refreshToken, imf, set }
  },
  {
    persist: {
      key: 'user',
      path: ['accessToken',
            'refreshToken']
    }
  }
)