<template>
  <v-container>
    <v-row class=" my-4">
  <v-col cols="12" class="d-flex align-center">
    <v-avatar size="100" class="mr-4">
      <v-img :src="user?.image" alt="User Image" />
    </v-avatar>
    <h1 class="text-h3">{{ user?.firstName }} {{ user?.lastName }}</h1>
    
  </v-col>
  
</v-row>   
    <v-row class="posts-container my-4">
      <v-col cols="12" class="posts-header">
        <h2 class="text-h4 font-weight-bold">ALL {{  user?.firstName  }} Posts</h2>
      </v-col>
      <v-col cols="12" class="posts-list">
        <ul class="list-unstyled">
          <li v-for="post in posts" :key="post.id" class="post-item">
            <nuxt-link :to="`/post/${post.id}`" class="post-link">
              {{ post.title }}
            </nuxt-link>
          </li>
        </ul>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const user = ref(null);
const posts = ref([]);

const fetchUserDataAndPosts = async () => {
  try {
    const userDataResponse = await fetch(
      `https://dummyjson.com/user/${route.params.id}`
    );
    const userData = await userDataResponse.json();

    const postsResponse = await fetch(
      `https://dummyjson.com/posts/user/${route.params.id}`
    );
    const postsData = await postsResponse.json();

    if (userData) {
      user.value = userData;
    }

    if (postsData) {
      posts.value = postsData.posts;
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchUserDataAndPosts();
});
</script>

<style scoped>
.post-content {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}

.posts-container {
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  
}
.posts-container span{
  font-weight: bold;
 }
.posts-header {
  margin-bottom: 20px;
}

.list-unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 20px;
  border-bottom: 1px solid #ddd;
}

.post-link {
  text-decoration: none;
  font-weight: bold;
  font-size: 22px;
  transition: color 0.3s ease;
}

.post-link:hover {
  color: #23527c;
}
.v-card-title {
  font-weight: bold;
  font-size: 25px;
}
</style>
