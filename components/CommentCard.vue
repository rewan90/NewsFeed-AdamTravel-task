<template>
  <v-card
    class="comment-card"
    :class="{ 'comment-card--hover': hover , 'overflow-auto h-350': isScrollable}"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <v-card class="my-4" v-for="comment in comments" :key="comment.id">
      <v-card-title>
        <!-- <v-avatar>
          <v-img :src="comment.avatarUrl"></v-img>
        </v-avatar> -->
        <span class="ml-2">{{ comment.user.fullName }}</span>
        <nuxt-link :to="`/user/${comment.user.id}`" target="_blank">
          @{{ comment.user.username }}
        </nuxt-link>
      </v-card-title>
      <v-spacer></v-spacer>

      <v-card-text>
        {{ comment.body }}
      </v-card-text>
    </v-card>
    <v-btn v-if="total > comments.length" class="my-2" color="primary" @click="showMoreComments">
      View more comments
    </v-btn>
  </v-card>
</template>

<script>
export default {
  name: "commentCard",
  props: {
    comments: Object,
    total: Number
  },
  data() {
    return {
      hover: false,
      isScrollable: false,
    };
  },
  methods: {
    
    showMoreComments() {
      this.$emit("showMoreComments");
      if (this.total > 3) {
        this.isScrollable = true
      }
    },
    
  },

};
</script>
<style>
.h-350{
  height: 350px;
}
</style>