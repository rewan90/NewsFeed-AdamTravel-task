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
            <div class="post-content"><span>Username</span>: @{{ user?.username }}</div>
            <div class="post-content"><span>Email</span>: {{ user?.email }}</div>
            <div class="post-content"><span>Phone</span>: {{ user?.phone }}</div>
            <div class="post-content"><span>Age</span>: {{ user?.age }}</div>
            <div class="post-content"><span>Gender</span>: {{ user?.gender }}</div>
            <div class="post-content"><span>Birth Date</span>: {{ user?.birthDate }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="posts-container">
          <v-card-title>Physical Characteristics</v-card-title>
          <v-card-text>
            <div class="post-content"><span>Height</span>: {{ user?.height }} cm</div>
            <div class="post-content"><span>Weight</span>: {{ user?.weight }} kg</div>
            <div class="post-content"><span>Eye Color</span>: {{ user?.eyeColor }}</div>
            <div class="post-content"><span>Hair Color</span>: {{ user?.hair.color }}</div>
            <div class="post-content"><span>Hair Type</span>: {{ user?.hair.type }}</div>
            <div class="post-content"><span>Blood Group</span>: {{ user?.bloodGroup }}</div>
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
          <v-card-title>Company Info</v-card-title>
          <v-card-text>
            <div class="post-content"><span>Company Name</span>: {{ user?.company.name }}</div>
            <div class="post-content"><span>Department</span>: {{ user?.company.department }}</div>
            <div class="post-content"><span>Gob Title </span>: {{ user?.company.title }}</div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="4" lg="3">
        <v-card class="posts-container">
          <v-card-title>Bank</v-card-title>
          <v-card-text>
            <div class="post-content"><span>Card Number</span>: {{ user?.bank.cardNumber }}
            </div>
            <div class="post-content"><span>Card Type</span>: {{ user?.bank.cardType }}</div>
            <div class="post-content"><span>Currency</span>: {{ user?.bank.currency }}</div>
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
