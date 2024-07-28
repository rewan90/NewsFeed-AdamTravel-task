<template>
  <v-infinite-scroll :posts="posts" :onLoad="loadMorePosts">
    <v-container fluid class="feed-page">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6">
          <h1 class="text-h4 font-weight-bold mb-4">Feed Page</h1>
          <v-divider class="mb-4"></v-divider>

          <div class="my-4" v-for="post in posts" :key="post.id">
            <PostCard :post="post" :postClass="$attrs.class" />
          </div>
          <div v-if="posts.length === 0">
            <p class="text-center mt-4">No New Posts</p>
          </div>
          <div v-if="posts.length == total && total > 0">
            <p class="text-center mt-4">No New Posts</p>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-infinite-scroll>
</template>

<script>
import PostCard from "~/components/PostCard.vue";

export default {
  name: "FeedPage",
  components: { PostCard },
  data() {
    return {
      limit: 1,
      posts: [],
      total: 0,
    };
  },
  methods: {
    async loadMorePosts({ done }) {
      if (this.posts.length == this.total && this.total > 0) {
        done("empty");
      } else {
        await this.fetchMorePosts(this.limit);
        done("ok");
      }
    },
    async fetchMorePosts(limit) {
      const offset = this.posts.length; // offset by the number of posts already fetched
      const response = await fetch(
        `https://dummyjson.com/posts?limit=${limit}&skip=${offset}`
      );
      const data = await response.json();
      this.posts.push(...data.posts);
      // get total
      this.total = data.total;
    },
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
