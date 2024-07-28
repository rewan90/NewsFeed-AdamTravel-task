<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-h3">{{ post?.title }}</h1>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <div class="post-content" v-html="post?.body"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useFeedStore } from "~/stores/feedStore";
import { useRoute } from "vue-router";

const feedStore = useFeedStore();
const route = useRoute();
const post = ref(null);

onMounted(async () => {
  try {
    const response = await fetch(
      `https://dummyjson.com/posts/${route.params.id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch post");
    }
    const data = await response.json();
    post.value = data;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style scoped>
.post-content {
  font-size: 1.2rem;
  line-height: 1.5;
  margin-bottom: 2rem;
}
</style>