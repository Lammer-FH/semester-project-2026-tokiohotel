<template>
  <dl class="details-grid">
    <div
      v-for="(row, i) in rows"
      :key="i"
      class="detail-row"
      :class="{ 'detail-row--total': row.highlight }"
    >
      <dt>{{ row.label }}</dt>
      <dd>{{ row.value }}</dd>
    </div>
  </dl>
</template>

<script setup lang="ts">
export interface DetailRow {
  label: string;
  value: string;
  highlight?: boolean;
}

defineProps<{ rows: DetailRow[] }>();
</script>

<style scoped>
.details-grid {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
  background: #1a1a1a;
  padding: 20px 24px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 16px;
  padding: 10px 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.detail-row:last-child,
.detail-row--total {
  border-bottom: none;
}

.detail-row dt {
  font-size: 13px;
  color: #8a8278;
  font-weight: 500;
}

.detail-row dd {
  margin: 0;
  color: #f5f0e8;
  font-size: 15px;
  text-align: right;
}

.detail-row + .detail-row--total {
  border-top: 1px solid rgba(201, 169, 110, 0.25);
  margin-top: -1px;
  padding-top: 14px;
}

.detail-row--total dt,
.detail-row--total dd {
  font-size: 18px;
  font-weight: 600;
  color: #c9a96e;
}
</style>
