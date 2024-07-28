<template>
  <NuxtLayout>
    <div>
      <Header/>

      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
<script setup lang="ts">
const nuxtApp = useNuxtApp()
</script>
<style>
a{
  text-decoration: none;
}
</style>