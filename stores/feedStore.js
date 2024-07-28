import { defineStore } from 'pinia'
import axios from 'axios';


export const useFeedStore = defineStore('feed', {
  state: () => ({
    posts: [],
    comments: [],
    loading: false,
    users: [],
    post: null,
    user:'',


    
  }),
  actions: {
    async fetchPosts() {
      const response = await fetch(`https://dummyjson.com/posts`);
      const data = await response.json();
      this.posts = data.posts;
    },
    
    async fetchMorePosts() {
      const limit = 1; // fetch 1 post at a time
      const offset = this.posts.length; // offset by the number of posts already fetched
      const response = await fetch(`https://dummyjson.com/posts?limit=${limit}&skip=${offset}`);
      const data = await response.json();
      this.posts.push(...data.posts);
    },
      async fetchPost(id) {
        try {
          const response = await axios.get(`https://dummyjson.com/posts/${route.params.id}`);
          this.post = response.data;
        } catch (error) {
          console.error(error);
        }
      },

    async fetchComments() {
      const response = await fetch('https://dummyjson.com/comments')
      const data = await response.json()
      this.comments = data.comments
    },

    

    async asyncData({ params, $fetch }) {
      const userId = params.id;
      const user = await $fetch(`https://dummyjson.com/user/${userId}`);
      return { user };
    },
   
    async fetchUsers() {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json()
      this.users = data.users
    }
  },
  getters: {
    getPostComments: (state) => (postId) => {
      return state.comments.filter((comment) => comment.postId === postId);
    },
}})