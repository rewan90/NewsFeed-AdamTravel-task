<template>
  <v-container
    fluid
    class="feed-page"
    ref="postContainer"
    v-intersect="loadMorePosts"
  >
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6">
        <h1 class="text-h4 font-weight-bold mb-4">Feed Page</h1>
        <v-divider class="mb-4"></v-divider>

        <div class="my-4" v-for="post in feedStore.posts" :key="post.id">
          <PostCard :post="post" :postClass="$attrs.class" />
        </div>

        <div v-if="feedStore.posts.length === 0">
          <p class="text-center mt-4">No New Posts</p>
        </div>
<!-- <div v-if="comments.length">
  <CommentCard
    v-for="(comment, index) in feedStore.comments.map((comment) => ({
      ...comment,
      key: index,
    }))"
    :key="comment.key"
    :comment="comment"
    class="mb-4"
  />
</div> -->
        <v-progress-circular indeterminate color="primary" v-if="loading" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted } from "vue";
import { useFeedStore } from "~/stores/feedStore";
import PostCard from "~/components/PostCard.vue";

export default {
  name: "FeedPage",
  components: { PostCard },
  setup() {
    const feedStore = useFeedStore();
    feedStore.fetchPosts();
    // feedStore.fetchComments();
    feedStore.fetchUsers();




    const postContainer = ref(null);
    const loading = ref(false);

    const loadMorePosts = async () => {
      loading.value = true;
      await feedStore.fetchMorePosts();
      loading.value = false;
    };

    return { feedStore, postContainer, loading, loadMorePosts };
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
