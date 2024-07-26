import { defineStore } from 'pinia'

export const useFeedStore = defineStore('feed', {
  state: () => ({
    posts: [],
    comments: [],
    users: []
  }),
  actions: {
    async fetchPosts() {
      const response = await fetch('https://dummyjson.com/posts')
      const data = await response.json()
      this.posts = data.posts
    },
    async fetchComments(postId) {
      const response = await fetch(`https://dummyjson.com/comments/post/${postId}`)
      const data = await response.json()
      this.comments = data.comments
    },
    async fetchUsers() {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()
      this.users = data.users
    }
  }
})