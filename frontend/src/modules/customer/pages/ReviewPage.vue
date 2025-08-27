<template>
  <q-page padding class="review-page">
    <h1 class="page-title">Leave a Review</h1>

    <q-card class="q-pa-lg shadow-card">
      <!-- Review Input -->
      <q-input
        v-model="review"
        type="textarea"
        label="Write your review..."
        outlined
        class="review-input"
      />

      <!-- Rating -->
      <div class="q-mt-lg rating-box">
        <span class="rating-label">Your Rating:</span>
        <q-rating v-model="rating" max="5" size="40px" color="amber" />
      </div>

      <!-- Submit Button -->
      <q-btn 
        unelevated
        class="submit-btn q-mt-lg" 
        label="Submit Review" 
        icon="send"
      />
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
/* Page Background */
.review-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Gradient Title */
.page-title {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 25px;
  color: black;
  text-align: center;
}

/* Card Styling */
.shadow-card {
  border-radius: 18px;
  width: 100%;
  max-width: 600px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(37, 117, 252, 0.15);
  transition: all 0.3s ease;
}
.shadow-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 10px 24px rgba(106, 17, 203, 0.25),
              0 12px 28px rgba(37, 117, 252, 0.25);
}

/* Textarea */
.review-input {
  border-radius: 12px;
}

/* Rating Box */
.rating-box {
  display: flex;
  align-items: center;
  gap: 12px;
}
.rating-label {
  font-weight: 600;
  color: #444;
}

/* Submit Button */
.submit-btn {
  background: linear-gradient(135deg, #6a11cb, #2575fc);
  color: #fff;
  font-weight: 600;
  font-size: 15px;
  padding: 12px 24px;
  border-radius: 12px;
  box-shadow: 0 6px 14px rgba(37, 117, 252, 0.3);
  transition: all 0.3s ease;
}
.submit-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 18px rgba(106, 17, 203, 0.35);
}
</style>
