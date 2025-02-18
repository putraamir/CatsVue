<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'

const cats = ref(null)

//Using parameter min_weight=1 to get all cats since the https://api.api-ninjas.com/v1/allcats requires Premium Subscription
axios.get('https://api.api-ninjas.com/v1/cats?min_weight=1', {
    headers: {
        'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY
    }
})
    .then(response => {
        cats.value = response.data
    })
    .catch(error => {
        console.error(error)
    })

</script>

<template>
    <main>
        <h1>Cats List</h1>

        <div v-if="cats" class="cats-grid">
            <div v-for="cat in cats" :key="cat.name" class="cat-card">
                <img :src="cat.image_link" :alt="cat.name" class="cat-image" style="display: block;" />
                <div class="cat-content">
                    <h2 class="cat-name">{{ cat.name }}</h2>

                    <div class="cat-info">
                        <p><strong>Origin:</strong> {{ cat.origin }}</p>
                        <p><strong>Size:</strong> {{ cat.length }}</p>
                        <p><strong>Weight:</strong> {{ cat.min_weight }} - {{ cat.max_weight }} lbs</p>
                        <p><strong>Life Expectancy:</strong> {{ cat.min_life_expectancy }} - {{ cat.max_life_expectancy
                        }} years</p>
                    </div>
                    <!-- <router-link :to="'/cats/' + cat.id" class="view-details-button">View Details</router-link> -->
                    <router-link :to="'/cats/' + cat.name">View Details</router-link>
                </div>
            </div>
        </div>
        <div v-else-if="error">
            <pre>{{ error }}</pre>
        </div>
        <div v-else class="loader">
            <p>Loading...</p>
        </div>
    </main>
</template>

<style scoped>
.cats-grid {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 2rem;
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

.cat-info strong {
    color: var(--color-heading);
}
</style>