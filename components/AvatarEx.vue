<template>
    
  <div>
    <v-avatar  size="53">
    <img :src="user.image"/>

    </v-avatar>
  </div>
</template>

<script>
export default {
  name: "AvatarEx",
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
    };
  },
  methods: {
    async fetchUsersById(userId) {
      const response = await fetch("https://dummyjson.com/users/" + userId);
      const data = await response.json();
      this.user = data;
    },
  },
  mounted() {
    this.fetchUsersById(this.userId);
  },
};
</script>
<style></style>