<script setup lang="ts">
import { ref } from 'vue';
import { catService } from '@/services/catService';
import type { Cat } from '../../types';

const cats = ref<Cat[]>([]);
const offset = ref(0);
const loading = ref(true);

const fetchMoreCats = () => {
    loading.value = true;

    catService.getAllCats(offset.value)
        .then(response => {
            if (!cats.value)
                cats.value = response.data;
            else
                cats.value = [...cats.value, ...response.data];

            offset.value += 20;
            loading.value = false;
        })
        .catch(error => {
            console.error(error);
        });
};

// Fetch the first set of cats
fetchMoreCats();
</script>

<template>
    <main>
        <h1>Cats List</h1>

        <!-- Cat List -->
        <div v-if="cats.length" class="cats-grid">
            <div v-for="cat in cats" :key="cat.name" class="cat-card">
                <img :src="cat.image_link" :alt="cat.name" class="cat-image" style="display: block;" />
                <div class="cat-content">
                    <h2 class="cat-name">{{ cat.name }}</h2>

                    <div class="cat-info">
                        <p><strong class="green">Origin:</strong> {{ cat.origin }}</p>
                        <p><strong class="green">Size:</strong> {{ cat.length }}</p>
                        <p><strong class="green">Weight:</strong> {{ cat.min_weight }} - {{ cat.max_weight }} lbs</p>
                        <p><strong class="green">Life Expectancy:</strong> {{ cat.min_life_expectancy }} - {{
                            cat.max_life_expectancy
                        }} years</p>
                    </div>

                    <router-link :to="'/cats/' + cat.name" class="btn">View Details</router-link>
                </div>
            </div>

        </div>

        <!-- Loading -->
        <div v-else class="loader">
            <p>Loading...</p>
        </div>

        <!-- See More Button -->
        <div v-if="cats" class="seeMoreContainer">
            <button @click="fetchMoreCats" class="btn">{{ loading ? "Loading..." : "See More" }}</button>
        </div>
    </main>
</template>

<style scoped>
main {
    overflow-y: scroll;
    max-height: 100vh;
}

.cats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
    margin-right: 2rem;
}

.loader {
    width: 100%;
    height: 100%;
    display: flex;
    place-items: center;
    justify-content: center;
}

.cat-card {
    background: var(--color-background-mute);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cat-image {
    width: 100%;
    height: 200px;
    object-fit: cover;
    margin: 0;
}

.cat-content {
    padding: 1.5rem;
}

.cat-name {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--color-heading);
}

.cat-info {
    margin-bottom: 1.5rem;
}

.cat-info p {
    margin: 0.5rem 0;
}

.seeMoreContainer {
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>