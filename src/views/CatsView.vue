<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const cats = ref(null);
const offset = ref(0);
const loading = ref(true);

const fetchMoreCats = () => {
    loading.value = true;

    //Need to use parameter min_weight=1 to get all cats since the https://api.api-ninjas.com/v1/allcats requires Premium Subscription
    axios.get('https://api.api-ninjas.com/v1/cats?min_weight=1&offset=' + offset.value, {
        headers: {
            'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY
        }
    })
        .then(response => {
            // If cats is null, set it to the response data, otherwise append the response data to the existing cats
            if (!cats.value)
                cats.value = response.data;
            else
                cats.value = [...cats.value, ...response.data];

            // Since the api only returns at most 20 cats, we need to increment the offset by 20 to get the next set of cats
            offset.value += 20;
            loading.value = false;
        })
        .catch(error => {
            console.error(error)
        })
}

// Fetch the first set of cats
fetchMoreCats();
</script>

<template>
    <main>
        <h1>Cats List</h1>

        <!-- Cat List -->
        <div v-if="cats" class="cats-grid">
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