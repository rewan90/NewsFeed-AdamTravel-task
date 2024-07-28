<template>
  <v-card
    v-if="post"
    class="post-card"
    :class="{ 'post-card--hover': hover }"
    @mouseover="hover = true"
    @mouseout="hover = false"
  >
    <PostUser :userId="post.userId" />
    <v-spacer></v-spacer>
    <v-card-title class="post-card__title">{{ post.title }}</v-card-title>
    <v-card-text class="post-card__content"
      >{{ body }}
      <span v-if="showmore" @click="updateshowmore()">...</span></v-card-text
    >
    <!-- <v-btn
      class="flex-end"
      color="primary"
      @click="$router.push(`/post/${post.id}`)"
    >
      Read More
    </v-btn> -->
    <!-- <span>
         <v-icon left>mdi-eye</v-icon>
        {{ post.views }}
     </span>
      -->

    <v-card-actions class="post-card__actions justify-space-around">
      <v-btn
        class="post-card__action"
        v-bind:color="isDisLiked ? 'error' : ''"
        @click="reactToPost('disLike')"
      >
        <v-icon left>mdi-thumb-down</v-icon>
        {{ post.reactions.dislikes }}
      </v-btn>
      <v-btn
        class="post-card__action"
        v-bind:color="isLiked ? 'primary' : ''"
        @click="reactToPost('like')"
      >
        <v-icon left>mdi-thumb-up</v-icon>
        {{ post.reactions.likes }}
      </v-btn>
      <v-btn
        class="post-card__action"
        color="secondary"
        @click="showCommentDialog"
      >
        <v-icon left>mdi-comment</v-icon>
        Comment
      </v-btn>

      <div>
        <v-btn
          class="post-card__action"
          color="success"
          @click="sharePost(post.id)"
        >
          <v-icon left>mdi-share</v-icon>
          Share
        </v-btn>

        <v-dialog v-model="shareDialog" max-width="300">
          <v-card>
            <v-card-title>Share this post:</v-card-title>
            <v-card-text>
              <input type="text" :value="postUrl" readonly />
            </v-card-text>
            <v-card-actions>
              <v-btn @click="copyUrl">Copy URL</v-btn>
              <v-btn @click="shareDialog = false">Close</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-card-actions>
    <CommentCard
      :comments="comments"
      :total="total"
      @showMoreComments="showMoreComments"
    />
  </v-card>
  <v-card v-model="commentDialog">
    <v-card>
      <v-card-title> Comment </v-card-title>
      <v-card-text>
        <v-textarea
          v-model="newComment.text"
          label="Write your comment"
          row-height="15"
          rows="1"
          variant="outlined"
          auto-grow
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="commentOnPost(post.id)"> Post </v-btn>
        <v-btn color="secondary" @click="commentDialog = false"> Cancel </v-btn>
      </v-card-actions>
    </v-card>
  </v-card>
</template>

<script>
export default {
  name: "PostCard",
  props: {
    post: {
      type: Object,
      required: true,
    },
    postClass: String,
    user: Object,
    comment: Object,
  },
  data() {
    return {
      comments: [],
      hover: false,
      showmore: false,
      shareDialog: false,
      postUrl: "",
      isLiked: false,
      isDisLiked: false,
      commentDialog: false,
      newComment: {
        firstName: "First",
        lastName: "Last",
        username: "username",
        avatarUrl:
          "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200&d=mp&r=g",
        text: "",
      },
      body: "",
      total: 0,
      limit: 2,
    };
  },
  methods: {
    async fetchCommentsById(postId) {
      const response = await fetch(
        "https://dummyjson.com/comments/post/" + postId + "?limit=" + this.limit
      );
      const data = await response.json();
      this.comments = data.comments;
      this.total = data.total;
    },
    showMoreComments() {
      this.limit = this.limit + 3;
      this.fetchCommentsById(this.post.id);
    },
    shortText() {
      let value = this.post.body;
      value.length > 50 ? (this.showmore = true) : (this.showmore = false);
      this.showmore ? (this.body = value.substr(0, 50)) : (this.body = value);
    },
    reactToPost(type) {
      // console.log(type);
      if (type == "like" && this.isLiked == false) {
        this.isLiked = true;
        this.post.reactions.likes++;
      } else if (this.isLiked == true) {
        this.isLiked = false;
        this.post.reactions.likes--;
      }
      if (type == "disLike" && this.isDisLiked == false) {
        this.isDisLiked = true;
        this.post.reactions.dislikes++;
        // console.log(this.post.reactions.dislikes);
      } else if (this.isDisLiked == true) {
        this.isDisLiked = false;
        this.post.reactions.dislikes--;
      }
    },
    updateshowmore() {
      this.showmore = false;
      this.body = this.post.body;
    },
    showCommentDialog() {
      this.commentDialog = true;
    },
    sharePost(postId) {
      // Generate a random URL for the post
      this.postUrl = `https://example.com/posts/${postId}/${Math.random()
        .toString(36)
        .substr(2, 9)}`;
      this.shareDialog = true;
    },
    copyUrl() {
      navigator.clipboard.writeText(this.postUrl).then(() => {
        alert("URL copied to clipboard!");
      });
    },
    commentOnPost(postId) {
      // Add the new comment to the beginning of the comments array
      this.comments.unshift({
        avatarUrl: this.newComment.avatarUrl,
        user: {
          fullName: this.fullName,
          username: this.newComment.username,
        },
        body: this.newComment.text,
      });

      // Reset the newComment object
      this.newComment.text = "";
      this.commentDialog = false;
    },
  },
  mounted() {
    // console.log(this.post);
    this.fetchCommentsById(this.post.id);
    this.shortText();
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
