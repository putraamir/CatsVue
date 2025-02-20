<script setup lang="ts">
import CatCard from '@/components/CatCard.vue';
import { useCatStore } from '@/stores/CatStore';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted, onUnmounted } from 'vue';

const catStore = useCatStore();
const { cats, loading } = storeToRefs(catStore);

// Calculate optimal number of cats to show based on screen height
const calculateShowCount = () => {
    const screenHeight = window.innerHeight;
    const rowHeight = 369; // height of each card in pixels
    const headerHeight = 100; // approximate height of header + padding
    const rows = Math.floor((screenHeight - headerHeight) / rowHeight);
    return Math.max(rows * 5, 8); // 4 cards per row (xl breakpoint), minimum 8 cards
};

const SHOW_COUNT = ref(calculateShowCount());

// Recalculate SHOW_COUNT when window is resized
const handleResize = () => {
    SHOW_COUNT.value = calculateShowCount();
};

onMounted(() => {
    window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
});

const page = ref(1);
const isInitialLoading = computed(() => loading.value && !cats.value.length);
const hasMoreToShow = computed(() => page.value * SHOW_COUNT.value < cats.value.length);
const hasPreviousPage = computed(() => page.value > 1);
const visibleCats = computed(() =>
    cats.value.slice(
        page.value * SHOW_COUNT.value - SHOW_COUNT.value,
        page.value * SHOW_COUNT.value
    )
);

const nextPage = () => {
    if (hasMoreToShow.value) {
        page.value++;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};

const previousPage = () => {
    if (hasPreviousPage.value) {
        page.value--;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
};
</script>

<template>
    <main class="w-full h-screen overflow-y-auto">
        <div class="flex flex-col gap-6 p-4 h-full">
            <h1 class="text-3xl text-center">Cats List ({{ catStore.numberOfCats }})</h1>

            <!-- Loading State -->
            <div v-if="isInitialLoading" class="flex justify-center items-center min-h-[200px]">
                <p>Loading cats...</p>
            </div>

            <!-- Empty State -->
            <div v-else-if="!cats.length" class="flex justify-center items-center min-h-[200px]">
                <p>No cats found</p>
            </div>

            <!-- Cat List -->
            <div v-else class="flex flex-1">
                <TransitionGroup name="fade" tag="div"
                    class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-5 gap-4 w-full grid-flow-row-dense">
                    <CatCard v-for="cat in visibleCats" :key="cat.name" :cat="cat" class="grid-item" />
                </TransitionGroup>
            </div>

            <!-- Pagination Controls -->
            <div v-if="cats.length" class="flex flex-row items-center justify-center gap-4 pb-4">
                <button @click="previousPage" :disabled="loading || !hasPreviousPage" class="btn w-10">
                    &lt;
                </button>
                <p class="text-center">
                    Page {{ page }} of {{ Math.ceil(cats.length / SHOW_COUNT) }}
                </p>

                <button @click="nextPage" :disabled="loading || !hasMoreToShow" class="btn w-10">
                    >
                </button>
            </div>
        </div>
    </main>
</template>

<style scoped>
.fade-enter-active {
    transition: opacity 0.3s;
    transition-delay: 0.3s;
}

.fade-leave-active {
    transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.grid-item {
    align-self: start;
}

.grid {
    align-items: start;
    grid-auto-rows: min-content;
}
</style>