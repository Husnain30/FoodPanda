<template>
  <q-page padding>
    <h1 class="page-title">⭐ Leave a Review</h1>
    <q-card class="q-pa-md shadow-card">
      <q-input v-model="review" type="textarea" label="Write your review..." />
      <div class="q-mt-md">
        <q-rating v-model="rating" max="5" size="32px" color="amber" />
      </div>
      <q-btn color="primary" label="Submit" class="q-mt-md" />
    </q-card>
  </q-page>
</template>

<script>
export default {
  data() {
    return { review: "", rating: 0 };
  },
};
</script>

<style scoped>
.page-title { font-size: 28px; margin-bottom: 20px; }
.shadow-card { border-radius: 16px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
</style>