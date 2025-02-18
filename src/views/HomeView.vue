<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

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

const catNames = ref(null);

//Using parameter min_weight=1 to get all cats since the https://api.api-ninjas.com/v1/allcats requires Premium Subscription
axios.get('https://api.api-ninjas.com/v1/cats?min_weight=1&offset=50', {
  headers: {
    'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY,
  },
})
  .then((response) => {
    catNames.value = response.data.map((cat) => cat.name);
  })
  .catch((error) => {
    console.error(error);
  });

// Add computed property for filtered suggestions
const suggestions = computed(() => {
  if (!searchQuery.value) return [];
  return catNames.value?.filter(name =>
    name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ) || [];
});

// Add function to handle suggestion selection
const selectSuggestion = (name: string) => {
  searchQuery.value = name;
  router.push(`/cats/${name}`);
};
</script>

<template>
  <main>
    <h1>Home</h1>

    <h2>Hey Cat Lover! Are you looking for a specific cat breed?</h2>

    <div class="search-container">
      <div class="search-wrapper">
        <input v-model="searchQuery" type="text" placeholder="Search for a cat" class="search-input" />
        <button @click="searchCat" class="btn">
          Search
        </button>
      </div>
      <ul v-if="suggestions.length" class="suggestions-list">
        <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)"
          class="suggestion-item">
          {{ suggestion }}
        </li>
      </ul>
    </div>
    <p class="error">{{ error }}</p>
  </main>
</template>

<style scoped>
.search-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}

.search-wrapper {
  display: flex;
  gap: 10px;
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

.suggestions-list {
  list-style: none;
  width: 200px;
  padding: 0;
  margin: 0;
  border: 1px solid var(--color-background-soft);
  border-radius: 4px;
  background-color: var(--color-background-soft);
  max-height: 300px;
  overflow-y: auto;
}

.suggestion-item {
  padding: 8px;
  cursor: pointer;
}

.suggestion-item:hover {
  background-color: hsla(160, 100%, 37%, 0.5);
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>
