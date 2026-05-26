<script setup lang="ts">
import { computed } from 'vue';
import { IonButton, IonButtons } from '@ionic/vue';

import type { PaginationMetadata } from '@/types/api';

const props = defineProps<{
  pagination: PaginationMetadata | null;
}>();

const emit = defineEmits<{
  changePage: [page: number];
}>();

const currentPage = computed(() => props.pagination?.currentPage ?? 0);
const totalPages = computed(() => props.pagination?.totalPages ?? 1);

function goToPage(page: number) {
  if (page < 0 || page >= totalPages.value) return;
  emit('changePage', page);
}
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <ion-buttons>
      <ion-button :disabled="currentPage === 0" @click="goToPage(currentPage - 1)">
        Previous
      </ion-button>

      <ion-button
        v-for="page in totalPages"
        :key="page"
        :fill="page - 1 === currentPage ? 'solid' : 'outline'"
        @click="goToPage(page - 1)"
      >
        {{ page }}
      </ion-button>

      <ion-button
        :disabled="currentPage >= totalPages - 1"
        @click="goToPage(currentPage + 1)"
      >
        Next
      </ion-button>
    </ion-buttons>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  justify-content: center;
  margin: 1.5rem 0;
}
</style>