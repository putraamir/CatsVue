<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useCatStore } from '@/stores/CatStore';

const route = useRoute();
const catName = route.params.id;
const catInfo = useCatStore().getCat(catName as string);

</script>

<template>
    <main class="page min-h-screen bg-[var(--color-background)] py-8">
        <div v-if="catInfo" class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid lg:grid-cols-2 gap-8">
                <!-- Left Column -->
                <div class="flex flex-col gap-6">
                    <!-- Image -->
                    <div class="relative group overflow-hidden rounded-2xl shadow-xl">
                        <img :src="catInfo.image_link" :alt="catInfo.name"
                            class="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-500">
                    </div>

                    <!-- Basic Info Card -->
                    <div class="bg-[var(--color-background-soft)] p-6 rounded-xl shadow-lg flex flex-col gap-3">
                        <h1 class="text-4xl font-bold mb-6 text-[var(--color-heading)]">{{ catInfo.name }}</h1>
                        <div class="grid sm:grid-cols-2 gap-4">
                            <div class="flex flex-col gap-1">
                                <span class="text-emerald-500">Origin</span>
                                <span>{{ catInfo.origin }}</span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-emerald-500">Size</span>
                                <span>{{ catInfo.length }}</span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-emerald-500">Weight</span>
                                <span>{{ catInfo.min_weight }} - {{ catInfo.max_weight }} lbs</span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="text-emerald-500">Life Expectancy</span>
                                <span>{{ catInfo.min_life_expectancy }} - {{ catInfo.max_life_expectancy }} years</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Right Column -->
                <div class="bg-[var(--color-background-soft)] p-6 rounded-xl shadow-lg h-fit flex flex-col gap-3">
                    <h2 class="text-2xl font-semibold mb-6 text-[var(--color-heading)]">Characteristics</h2>
                    <div class="grid sm:grid-cols-2 gap-4">
                        <div v-for="(rating, label) in {
                            '🧑🏻‍🧑🏻‍🧒🏻 Family Friendly': catInfo.family_friendly,
                            '👶🏻 Children Friendly': catInfo.children_friendly,
                            '🧠 Intelligence': catInfo.intelligence,
                            '🧹 Shedding': catInfo.shedding,
                            '🪮 Grooming': catInfo.grooming,
                            '❤️ General Health': catInfo.general_health,
                            '🛝 Playfulness': catInfo.playfulness,
                            '🐶 Other Pets Friendly': catInfo.other_pets_friendly
                        }" :key="label"
                            class="flex flex-col gap-2 p-4 bg-[var(--color-background-mute)] rounded-lg transition-all duration-300 hover:transform hover:-translate-y-1">
                            <span class="text-sm font-medium">{{ label }}</span>
                            <div class="text-[#FFD700] tracking-[3px] text-lg">{{ "⭐".repeat(rating) }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Loading State -->
        <div v-else class="h-[50vh] flex items-center justify-center">
            <div class="animate-pulse text-lg">Loading...</div>
        </div>
    </main>
</template>
