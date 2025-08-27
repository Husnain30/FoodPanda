<template>
  <q-card class="q-pa-md shadow-card">
    <h3 class="section-title">Delivery Address</h3>
    <q-input filled v-model="address" label="Enter your Location" class="input-field" style="width: 90%;" />
    <q-btn 
      flat 
      class="location-btn q-mt-sm" 
      label="Use Current Location" 
      icon="my_location" 
    />
  </q-card>
</template>

<script>
export default { 
  data() { 
    return { address: "" }; 
  } 
};
</script>

<style scoped>
.shadow-card {
  border-radius: 18px;
  box-shadow: 0 4px 16px rgba(106, 17, 203, 0.2),
              0 6px 20px rgba(37, 117, 252, 0.2);
  transition: all 0.3s ease;
}
.shadow-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 18px rgba(106, 17, 203, 0.3),
              0 8px 24px rgba(37, 117, 252, 0.3);
}

.section-title {
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 30px;
  color: #333;
}

/* Input */
.input-field {
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.95);
}

/* Location Button */
.location-btn {
  color: white !important;
  font-weight: 600;
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  border-radius: 10px;
  padding: 10px 12px;
  margin-top: 40px;
  transition: all 0.3s ease;
}
.location-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 10px rgba(37, 117, 252, 0.35);
}
</style>

