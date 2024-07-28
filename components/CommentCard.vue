<template>
  <v-card
    class="comment-card"
    :class="{ 'comment-card--hover': hover }"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <v-card class="my-4" v-for="comment in comments" :key="comment.id">
      <v-card-title>
        <!-- <v-avatar>
          <v-img :src="comment.avatarUrl"></v-img>
        </v-avatar> -->
        <span class="ml-2">{{ comment.user.fullName }}vvv</span>
        <nuxt-link :to="`/user/${comment.user.username}`" target="_blank">
          @{{ comment.user.username }}
        </nuxt-link>
      </v-card-title>
      <v-spacer></v-spacer>

      <v-card-text>
        {{ comment.body }}
      </v-card-text>
    </v-card>
    <v-btn class="my-2" color="primary" @click="showMoreComments">
      View more comments
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "commentCard",
  props: {
    comments: Object,
  },
  data() {
    return {
      hover: false,
    };
  },
  methods: {
    
    showMoreComments() {
      // Implement your functionality to fetch and display more comments here
    },
    
  },

};
</script>
