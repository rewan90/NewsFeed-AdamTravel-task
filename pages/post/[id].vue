<template>
  <v-container>
    <v-card
      class="mx-auto rounded-xl elevation-6 pa-5 text-white"
      color="#26c6da"
      max-width="900"
      prepend-icon="mdi-post"
      title="Post"
    >
      <template v-slot:prepend>
        <v-icon
          size="
        40"
        ></v-icon>
      </template>

      <v-row class="mx-lg-n5">
        <v-col cols="12" class="py-3 px-lg-5 bg-light">
          <h1 class="text-h3 font-weight-bold">{{ post?.title }}</h1>
        </v-col>
      </v-row>
      <v-row class="align-items-center">
        <v-col cols="12" class="post-content text-h5 py-2">
          {{ post?.body }}
        </v-col>
      </v-row>
      <v-card-actions>
        <v-list-item class="w-100">
          <template v-slot:append>
            <div class="justify-self-end">
              <v-icon class="me-1" icon="mdi-heart"></v-icon>
              <span class="subheading me-2">{{ post?.reactions.likes }}</span>
              <v-icon class="me-1" icon=" mdi-thumb-down"></v-icon>
              <span class="subheading me-2">{{
                post?.reactions.dislikes
              }}</span>
              <v-icon class="me-1" icon="mdi-eye"></v-icon>
              <span class="subheading">{{ post?.views }}</span>
            </div>
          </template>
        </v-list-item>
      </v-card-actions>
      <v-card-actions>
        <v-list-item class="text-h6">
          <span class="mr-2 my-3"
            ><span class="font-weight-bold text-h5">Tags: </span
            >{{ post?.tags.join(", ") }}</span
          >
        </v-list-item>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

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
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
  color: #0a0909;
}

.post-meta {
  font-size: 14px;
  margin-bottom: 20px;
  color: #999;
}

.post-meta span {
  margin-right: 20px;
}
</style>
