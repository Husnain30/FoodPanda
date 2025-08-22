<template>
  <q-card class="q-pa-md q-mb-md text-center">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div class="text-h5 text-primary q-mt-sm">{{ value }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "StatsCard",
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
  },
};
</script>
