<template>
  <q-page padding class="track-page">
    <h1 class="page-title">Track Your Order</h1>

    <!-- Timeline -->
    <q-card class="shadow-card q-pa-lg">
      <q-timeline color="primary">
        <q-timeline-entry title="Order Placed" subtitle="10:00 AM" icon="shopping_cart" />
        <q-timeline-entry title="Preparing Food" subtitle="10:15 AM" icon="restaurant" />
        <q-timeline-entry title="Out for Delivery" subtitle="10:45 AM" icon="delivery_dining" />
        <q-timeline-entry title="Delivered" subtitle="11:15 AM" icon="done_all" />
      </q-timeline>

      <!-- Button -->
      <div class="q-mt-lg text-center">
        <q-btn 
          unelevated
          class="track-btn"
          icon="map"
          label="Track on Map"
        />
      </div>
    </q-card>
  </q-page>
</template>

<style scoped>
.track-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Gradient Title */
.page-title {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 25px;
  text-align: center;
  color: #2d3436;
}

/* Card Styling */
.shadow-card {
  border-radius: 18px;
  width: 100%;
  max-width: 600px;
  background: #fff;
  box-shadow: 0 6px 18px rgba(0,0,0,0.12);
  transition: all 0.3s ease;
}
.shadow-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 22px rgba(0,0,0,0.18);
}

/* Timeline spacing */
.q-timeline {
  padding: 10px 0;
}
.q-timeline-entry__title {
  font-weight: 600;
  color: #333;
}
.q-timeline-entry__subtitle {
  color: #666;
  font-size: 14px;
}

/* Gradient Button */
.track-btn {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(37, 117, 252, 0.3);
  transition: all 0.3s ease;
}
.track-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 18px rgba(106, 17, 203, 0.35);
}
</style>
