<template>
  <q-card class="q-pa-md q-mb-md">
    <q-card-section>
      <div class="text-h6">{{ title }}</div>
      <div v-if="value !== null">{{ value }}</div>
      <div v-else>
        <q-spinner size="sm" /> Loading...
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "StatsCard",
  props: {
    title: { type: String, required: true },
    value: { type: [Number, String, null], default: null }
  }
}
</script>
