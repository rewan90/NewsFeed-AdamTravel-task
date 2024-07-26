<template>
  <v-container fluid class="feed-page">
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h4 font-weight-bold mb-4">Feed Page</h1>
        <v-divider class="mb-4"></v-divider>
        
        <div v-for="post in feedStore.posts" :key="post.id">
          <PostCard :post="post" class="mb-4" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useFeedStore } from "~/stores/feedStore";
import PostCard from "~/components/PostCard.vue";

export default {
  name: "FeedPage",
  components: { PostCard },
  setup() {
    const feedStore = useFeedStore();
    feedStore.fetchPosts();
    return { feedStore };
  },
};
</script>

<style scoped>
.feed-page {
  background-color: #f5f5f5;
  padding: 20px;
}

.feed-page h1 {
  color: #333;
}

.feed-page .v-divider {
  border-color: #ccc;
}

.feed-page .post-card {
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.feed-page .post-card:hover {
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}
</style>
