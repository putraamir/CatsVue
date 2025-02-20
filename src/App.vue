<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useCatStore } from './stores/CatStore';

onMounted(async () => {
  const catStore = useCatStore();
  await catStore.fetchAllCats();
})
</script>

<template>
  <header class="leading-4 max-h-[100vh]">
    <nav class="flex flex-col text-xs text-center pt-6 gap-3 pr-8 w-36">
      <RouterLink to="/" class="text-xl">Home</RouterLink>
      <RouterLink to="/cats" class="text-xl">Cats</RouterLink>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
  letter-spacing: normal;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 2px solid var(--color-border);
  text-align: left;
}

nav a:first-of-type {
  border: 0;
}
</style>
