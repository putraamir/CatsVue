<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
import { useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const catName = route.params.id
const catInfo = ref(null)

axios.get('https://api.api-ninjas.com/v1/cats?name=' + catName, {
    headers: {
        'X-Api-Key': import.meta.env.VITE_API_NINJAS_KEY
    }
}).then((response) => {
    if (response.data.length === 0)
        router.push({ path: '/', query: { message: "No cats found by the name '" + catName + "'" } })

    catInfo.value = response.data
}).catch((error) => {
    console.error(error)
});
</script>

<template>
    <main>
        <div v-if="catInfo && catInfo[0]" class="cat-details">
            <div class="image-container"><img :src="catInfo[0].image_link" :alt="catInfo[0].name" class="cat-image">
            </div>
            <h1>{{ catInfo[0].name }}</h1>

            <div class="info-grid">
                <p><strong>Origin:</strong> {{ catInfo[0].origin }}</p>
                <p><strong>Length:</strong> {{ catInfo[0].length }}</p>
                <p><strong>Weight:</strong> {{ catInfo[0].min_weight }} - {{ catInfo[0].max_weight }} lbs</p>
                <p><strong>Life Expectancy:</strong> {{ catInfo[0].min_life_expectancy }} - {{
                    catInfo[0].max_life_expectancy }} years</p>
            </div>

            <div class="ratings">
                <div class="rating">
                    <span>🧑🏻‍🧑🏻‍🧒🏻 Family Friendly</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].family_friendly) }}</div>
                </div>
                <div class="rating">
                    <span>👶🏻 Children Friendly</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].children_friendly) }}</div>
                </div>
                <div class="rating">
                    <span>🧠 Intelligence</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].intelligence) }}</div>
                </div>
                <div class="rating">
                    <span>🧹 Shedding</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].shedding) }}</div>
                </div>
                <div class="rating">
                    <span>🪮 Grooming</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].grooming) }}</div>
                </div>
                <div class="rating">
                    <span>❤️ General Health</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].general_health) }}</div>
                </div>
                <div class="rating">
                    <span>🛝 Playfulness</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].playfulness) }}</div>
                </div>
                <div class="rating">
                    <span>🐶 Other Pets Friendly</span>
                    <div class="stars">{{ "⭐".repeat(catInfo[0].other_pets_friendly) }}</div>
                </div>
            </div>
        </div>

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