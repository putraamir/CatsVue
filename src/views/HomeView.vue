<script setup lang="ts">
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const error = ref(route.query.message || '');

const searchCat = () => {
  if (searchQuery.value) {
    router.push(`/cats/${searchQuery.value}`);
  } else {
    error.value = 'Please enter a cat name';
  }
};
</script>

<template>
  <main>
    <h1>Home</h1>

    <h2>Hey Cat Lover! Are you looking for a specific cat?</h2>

    <div class="search-container">
      <input v-model="searchQuery" type="text" placeholder="Search for a cat" class="search-input" />
      <button @click="searchCat" class="search-button">
        Search
      </button>
    </div>
    <p class="error">{{ error }}</p>
  </main>
</template>

<style scoped>
.search-container {
  display: flex;
  gap: 10px;
  margin: 20px 0;
}

.search-input {
  padding: 8px;
  border: 2px solid var(--color-background-soft);
  border-radius: 4px;
  font-size: 16px;
  width: 200px;
  color: white;
  background-color: var(--color-background-soft);
}

.search-button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.search-button:hover {
  background-color: #45a049;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
