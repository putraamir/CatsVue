<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useCatStore } from '@/stores/CatStore';
import { storeToRefs } from 'pinia';

const route = useRoute();
const router = useRouter();
const searchQuery = ref('');
const { catNames } = storeToRefs(useCatStore());

//Get error message from parameter or set to ''
const error = ref(route.query.message || '');

const suggestions = computed<string[]>(() => {
  //If searchQuery has no value, return empty array
  if (!searchQuery.value) return [];

  //Filter catNames based on searchQuery
  return catNames.value.filter((name: string) =>
    name.toLowerCase().includes(searchQuery.value.toLowerCase())
  ) || [];
});

// Add function to handle suggestion selection
const selectSuggestion = (name: string) => {
  searchQuery.value = name;
  router.push(`/cats/${name}`);
};

//Search cat function
const searchCat = () => {
  //If searchQuery has a value, push to the cat details page, else set error message
  if (searchQuery.value)
    router.push(`/cats/${searchQuery.value}`);
  else
    error.value = 'Please enter a cat name';
};

</script>

<template class="w-screen">
  <main class="page w-full flex flex-col items-center gap-6 pt-4">
    <h1 class="text-3xl text-center">Home</h1>

    <div class="flex flex-1 flex-col gap-6 justify-center items-center">
      <h2 class="text-2xl">Hey Cat Lover! Are you looking for a specific cat breed?</h2>

      <!-- Search Input -->
      <div class="flex flex-col gap-2.5 m-5">
        <div class="flex gap-2">
          <input v-model="searchQuery" type="text" placeholder="Search for a cat"
            class="p-2 rounded-lg w-[200px] text-white bg-[color:var(--color-background-soft)]" />
          <button @click="searchCat" class="btn">
            Search
          </button>
        </div>

        <!-- Suggestions List -->
        <div class="relative">
          <ul v-if="suggestions.length"
            class="absolute top-full mt-1 listnone w-[200px] p-0 m-0 rounded-md bg-[color:var(--color-background-soft)] overflow-y-auto max-h-[250px]">
            <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)"
              class="p-2 cursor-pointer hover:bg-[color:hsla(160,100%,37%,0.5)]">
              {{ suggestion }}
            </li>
          </ul>
        </div>
      </div>

      <!-- Error -->
      <p class="text-red-500 text-sm">{{ error }}</p>
    </div>
  </main>
</template>