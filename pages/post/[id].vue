<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card v-if="post">
          <v-card-title>{{ post.title }}</v-card-title>
          <v-card-text>{{ post.body }}</v-card-text>
        </v-card>
        <v-card v-else>
          <v-card-title>Post not found</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
