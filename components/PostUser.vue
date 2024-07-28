<template>
  <nuxt-link @click="$router.push(`/user/${userId}`)">
    <v-row class="posts-container my-4">
      <v-col cols="12" class="d-flex align-center">
        <v-avatar size="100" class="mr-4">
          <v-img :src="user?.image" alt="User Image" />
        </v-avatar>
        <h1 class="text-h2">{{ user?.firstName }} {{ user?.lastName }}</h1>
        <h3 class="text-h3">@{{ user?.username }}</h3>
      </v-col>
    </v-row>
  </nuxt-link>
</template>

<script>
export default {
  name: "PostUser",
  props: {
    userId: Number,
  },
  data() {
    return {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        image: "",
      },
    }
  },
  methods: {
    async fetchUsersById(userId) {
      const response = await fetch(
        "https://dummyjson.com/users/" + userId
      );
      const data = await response.json();
      this.user = data;
    },
  },
  mounted() {
    // console.log(this.post);
    this.fetchUsersById(this.userId);
  }
};
</script>
<style></style>
