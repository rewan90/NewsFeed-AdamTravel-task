<template>
  <v-card
    class="post-card"
    :class="{ 'post-card--hover': hover }"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <v-card-title>
      <v-avatar>
        <v-img
          src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mp&r=g"
        ></v-img>
      </v-avatar>
      <span class="ml-2">First name Last name</span>
      <span class="ml-2">@username</span>
    </v-card-title>
    <v-spacer></v-spacer>

    <v-card-title class="post-card__title">{{ post.title }}</v-card-title>
    <v-card-text class="post-card__content">{{ post.body }}</v-card-text>
    <v-card-actions class="post-card__actions">
      <v-btn
        class="post-card__action"
        color="primary"
        @click="reactToPost(post.id)"
      >
        <v-icon left>mdi-thumb-up</v-icon>
        React
        {{ reactionCount }}
      </v-btn>

      <v-btn
        class="post-card__action"
        color="secondary"
        @click="showCommentDialog"
      >
        <v-icon left>mdi-comment</v-icon>
        Comment
      </v-btn>

      <v-btn
        class="post-card__action"
        color="success"
        @click="sharePost(post.id)"
      >
        <v-icon left>mdi-share</v-icon>
        Share
      </v-btn>
    </v-card-actions>
    <v-card v-for="(comment, index) in comments" :key="index">
      <v-card-title>
        <v-avatar>
          <v-img :src="comment.avatarUrl"></v-img>
        </v-avatar>
        <span class="ml-2">{{ comment.firstName }} {{ comment.lastName }}</span>
        <span class="ml-2">@{{ comment.username }}</span>
      </v-card-title>
      <v-card-text>
        {{ comment.text }}
      </v-card-text>
    </v-card>
    <v-btn color="primary" @click="showMoreComments">
      View more comments
    </v-btn>
    <v-dialog v-model="commentDialog" width="500">
      <v-card>
        <v-card-title> Comment </v-card-title>
        <v-card-text>
          <v-textarea
            v-model="newComment.text"
            label="Write your comment"
          ></v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="commentOnPost(post.id)"> Post </v-btn>
          <v-btn color="secondary" @click="commentDialog = false">
            Cancel
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: Object,
  },
  data() {
    return {
      hover: false,
      reactionCount: 0,
      commentDialog: false,
      newComment: {
        firstName: "First",
        lastName: "Last",
        username: "username",
        avatarUrl:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mp&r=g",
        text: "",
      },
      comments: [
        {
          firstName: "First",
          lastName: "Last",
          username: "username",
          avatarUrl:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mp&r=g",
          text: "This is a comment.",
        },
        {
          firstName: "First",
          lastName: "Last",
          username: "username",
          avatarUrl:
            "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mp&r=g",
          text: "This is another comment.",
        },
      ],
    };
  },

  methods: {
    reactToPost(postId) {
      this.reactionCount++;
    },
    showCommentDialog() {
      this.commentDialog = true;
    },
    commentOnPost(postId) {
      this.comments.push({ ...this.newComment });
      this.newComment.text = "";
      this.commentDialog = false;
    },
    sharePost(postId) {
      // Implement your share functionality here
    },
    showMoreComments() {
      // Implement your functionality to fetch and display more comments here
    },
  },
};
</script>

<style lang="scss" scoped>
.post-card {
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  &--hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  &__title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
  }

  &__content {
    font-size: 14px;
    color: #666;
  }

  &__actions {
    padding: 16px;
  }

  &__action {
    margin-right: 16px;

    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
