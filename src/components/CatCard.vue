<script setup lang="ts">
import type { PropType } from 'vue';
import type { Cat } from '../../types';

defineProps({
    cat: {
        type: Object as PropType<Cat>,
        required: true,
    }
});
</script>

<template>
    <div class="bg-[var(--color-background-mute)] rounded-lg overflow-hidden shadow-md card h-fit">
        <div class="aspect-[4/2] overflow-hidden">
            <img :src="cat.image_link" :alt="cat.name" class="w-full h-full object-cover m-0 block" />
        </div>
        <div class="flex flex-col gap-4 p-6">
            <h2 class="text-2xl text-[var(--color-heading)]">{{ cat.name }}</h2>
            <router-link :to="`/cats/${cat.name}`" class="btn flex flex-row justify-between items-center mt-4">
                View Details <span>➡️</span>
            </router-link>
        </div>
    </div>
</template>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    transition: transform 0.3s ease;
}

.card:hover {
    transform: translateY(-8px);
}

.card img {
    transition: transform 0.3s ease;
}

.card:hover img {
    transform: scale(1.1);
}
</style>