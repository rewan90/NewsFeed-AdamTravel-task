<template>
  <v-container>
    <v-row class="posts-container my-4">
  <v-col cols="12" class="d-flex align-center">
    <v-avatar size="100" class="mr-4">
      <v-img :src="user?.image" alt="User Image" />
    </v-avatar>
    <h1 class="text-h3">{{ user?.firstName }} {{ user?.lastName }}</h1>
  </v-col>
</v-row>
    <v-row class="my-4">
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="posts-container">
          <v-card-title>Profile</v-card-title>
          <v-card-text>
            <div class="post-content">Username: @{{ user?.username }}</div>
            <div class="post-content">Email: {{ user?.email }}</div>
            <div class="post-content">Phone: {{ user?.phone }}</div>
            <div class="post-content">Age: {{ user?.age }}</div>
            <div class="post-content">Gender: {{ user?.gender }}</div>
            <div class="post-content">Birth Date: {{ user?.birthDate }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="posts-container">
          <v-card-title>Physical Characteristics</v-card-title>
          <v-card-text>
            <div class="post-content">Height: {{ user?.height }} cm</div>
            <div class="post-content">Weight: {{ user?.weight }} kg</div>
            <div class="post-content">Eye Color: {{ user?.eyeColor }}</div>
            <div class="post-content">Hair Color: {{ user?.hair.color }}</div>
            <div class="post-content">Hair Type: {{ user?.hair.type }}</div>
            <div class="post-content">Blood Group: {{ user?.bloodGroup }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="posts-container">
          <v-card-title>Address</v-card-title>
          <v-card-text>
            <div class="post-content">{{ user?.address.address }}</div>
            <div class="post-content">
              {{ user?.address.city }}, {{ user?.address.state }}
            </div>
            <div class="post-content">{{ user?.address.postalCode }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="posts-container">
          <v-card-title>Company</v-card-title>
          <v-card-text>
            <div class="post-content">{{ user?.company.name }}</div>
            <div class="post-content">{{ user?.company.department }}</div>
            <div class="post-content">{{ user?.company.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="posts-container">
          <v-card-title>Bank</v-card-title>
          <v-card-text>
            <div class="post-content">
              Card Number: {{ user?.bank.cardNumber }}
            </div>
            <div class="post-content">Card Type: {{ user?.bank.cardType }}</div>
            <div class="post-content">Currency: {{ user?.bank.currency }}</div>
          </v-card-text>
        </v-card>
      </v-col>

    </v-row>
    <v-row class="posts-container my-4">
      <v-col cols="12" class="posts-header">
        <h2 class="text-h4 font-weight-bold">Posts</h2>
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
import { useFeedStore } from "~/stores/feedStore";

const feedStore = useFeedStore();
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

.posts-header {
  margin-bottom: 20px;
}

.list-unstyled {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.post-link {
  text-decoration: none;
  font-weight: bold;
  font-size: large;
  transition: color 0.3s ease;
}

.post-link:hover {
  color: #23527c;
}
.v-card-title {
  font-weight: bold;
  font-size: 20px;
}
</style>
