<template>
  <div
    class="comment-card"
    :class="{
      'comment-card--hover': hover,
      'overflow-auto h-350': isScrollable,
    }"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <div class="my-4" v-for="comment in comments" :key="comment.id">
      <v-card-title>
        <div class="d-inline-flex justify-center align-self-center">
          <avatar-ex
            class=""
            :userId="comment.user.id"
          />

          <span class=" d-inline-flex justify-center align-self-center">
            {{ comment.user.fullName }}
          </span>
        </div>
        <br />
        <nuxt-link  class="mx-12" :to="`/user/${comment.user.id}`" target="_blank">
          @{{ comment.user.username }}
        </nuxt-link>
      </v-card-title>
      <v-spacer></v-spacer>

      <v-card-text class="mx-5

      " >
        {{ comment.body }}
      </v-card-text>
    </div>
    <v-btn
      v-if="total > comments.length"
      class="my-3 ma-4"
      color="primary"
      @click="showMoreComments"
    >
      View more comments
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "commentCard",
  props: {
    comments: Object,
    total: Number,
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
        this.isScrollable = true;
      }
    },
  },
};
</script>
<style>
.h-350 {
  height: 350px;
}
</style>
