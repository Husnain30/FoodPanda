<template>
  <q-card class="map-card shadow-3">
    <q-card-section>
      <div class="text-subtitle1 q-mb-sm">Live Navigation</div>
      <div class="map-placeholder">
        <q-icon name="map" size="100px" class="text-primary" />
        <div class="text-caption">Map Placeholder (Integrate Google Maps API)</div>
      </div>
    </q-card-section>
  </q-card>
</template>

<style scoped>
.map-card {
  border-radius: 12px;
}
.map-placeholder {
  background: #eef3f7;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
}
</style>