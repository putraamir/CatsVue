<script setup lang="ts">
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { catService } from '@/services/catService';
import type { Cat } from '../../types';

const route = useRoute();
const router = useRouter();
const catName = route.params.id;
const catInfo = ref<Cat>();

catService.getCatByName(catName as string)
    .then(response => {
        if (!response.data.length)
            router.push({ path: '/', query: { message: `No cats found by the name '${catName}'` } });

        catInfo.value = response.data[0] as Cat;
    })
    .catch(error => {
        console.error(error);
    });
</script>

<template>
    <main>
        <div v-if="catInfo" class="cat-details">
            <!-- Image -->
            <div class="image-container">
                <img :src="catInfo.image_link" :alt="catInfo.name" class="cat-image">
            </div>

            <!-- Name -->
            <h1>{{ catInfo.name }}</h1>

            <!-- Info -->
            <div class="info-grid">
                <p><strong class="green">Origin:</strong> {{ catInfo.origin }}</p>
                <p><strong class="green">Size:</strong> {{ catInfo.length }}</p>
                <p><strong class="green">Weight:</strong> {{ catInfo.min_weight }} - {{ catInfo.max_weight }} lbs
                </p>
                <p><strong class="green">Life Expectancy:</strong> {{ catInfo.min_life_expectancy }} - {{
                    catInfo.max_life_expectancy }} years</p>
            </div>

            <!-- Ratings -->
            <div class="ratings">
                <div class="rating">
                    <span>🧑🏻‍🧑🏻‍🧒🏻 Family Friendly</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.family_friendly) }}</div>
                </div>
                <div class="rating">
                    <span>👶🏻 Children Friendly</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.children_friendly) }}</div>
                </div>
                <div class="rating">
                    <span>🧠 Intelligence</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.intelligence) }}</div>
                </div>
                <div class="rating">
                    <span>🧹 Shedding</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.shedding) }}</div>
                </div>
                <div class="rating">
                    <span>🪮 Grooming</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.grooming) }}</div>
                </div>
                <div class="rating">
                    <span>❤️ General Health</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.general_health) }}</div>
                </div>
                <div class="rating">
                    <span>🛝 Playfulness</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.playfulness) }}</div>
                </div>
                <div class="rating">
                    <span>🐶 Other Pets Friendly</span>
                    <div class="stars">{{ "⭐".repeat(catInfo.other_pets_friendly) }}</div>
                </div>
            </div>
        </div>

        <!-- Loading -->
        <div v-else class="loader">
            <p>Loading...</p>
        </div>
    </main>
</template>

<style scope>
main {
    width: 100%;
}

.loader {
    width: 100%;
    height: 100%;
    display: flex;
    place-items: center;
    justify-content: center;
}

.ratings {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 1rem;
}

.rating {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.rating span {
    font-size: 0.9rem;
    color: var(--color-text-light);
}

.stars {
    color: #FFD700;
    letter-spacing: 3px;
}

.cat-details {
    width: 100%;
    margin: 0 auto;
    padding: 1rem;
}

.image-container {
    width: 100%;
    display: grid;
    place-items: center;
}

.cat-image {
    width: 100%;
    max-width: 400px;
    height: auto;
    border-radius: 8px;
    margin: 1rem 0;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
    margin: 1rem 0;
}

h1 {
    text-align: center;
    color: var(--color-heading);
    margin: 1rem 0;
}
</style>