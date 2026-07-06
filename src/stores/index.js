import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    currentDynasty: '',
    currentGender: 'female',
    language: 'zh-CN'
  }),
  actions: {
    setDynasty(dynasty) {
      this.currentDynasty = dynasty
    },
    setGender(gender) {
      this.currentGender = gender
    },
    setLanguage(lang) {
      this.language = lang
    }
  }
})
