<template>
  <q-page class="q-pa-md">
    <!-- Page Title -->
    <div class="text-h5 q-mb-md">Write a Review</div>

    <!-- Review Form -->
    <q-card class="q-pa-md q-mb-lg">
      <q-input
        v-model="review.comment"
        type="textarea"
        label="Your Review"
        outlined
        class="q-mb-md"
      />
      <q-input
        v-model.number="review.rating"
        type="number"
        label="Rating (1-5)"
        outlined
        min="1"
        max="5"
        class="q-mb-md"
      />
      <q-btn
        :label="isEditing ? 'Update Review' : 'Submit Review'"
        color="primary"
        :loading="loading"
        @click="isEditing ? submitUpdate() : submitReview()"
      />
      <q-btn
        v-if="isEditing"
        flat
        color="secondary"
        label="Cancel"
        class="q-ml-sm"
        @click="cancelEdit"
      />
    </q-card>

    <!-- Reviews List -->
    <div class="text-h6 q-mb-sm">Your Submitted Reviews</div>
    <q-card
      v-for="rev in reviews"
      :key="rev.id"
      class="q-pa-md q-mb-sm"
    >
      <div class="row items-center justify-between">
        <div>
          <div class="text-subtitle1">⭐ {{ rev.rating }}/5</div>
          <div>{{ rev.comment }}</div>
        </div>
        <div>
          <q-btn flat color="primary" icon="edit" @click="editReview(rev)" />
          <q-btn flat color="negative" icon="delete" @click="removeReview(rev.id)" />
        </div>
      </div>
    </q-card>

    <!-- Error -->
    <div v-if="error" class="text-negative q-mt-md">
      {{ error }}
    </div>
  </q-page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "ReviewPage",
  data() {
    return {
      review: {
        restaurant_id: null,
        rating: 5,
        comment: "",
      },
      isEditing: false,
      editId: null,
    };
  },
  computed: {
    ...mapGetters("customer", [
      "customerReviews",
      "customerLoading",
      "customerError",
    ]),
    reviews() {
      return this.customerReviews;
    },
    loading() {
      return this.customerLoading;
    },
    error() {
      return this.customerError;
    },
  },
  methods: {
    ...mapActions("customer", ["postReview", "updateReview", "deleteReview"]),

    async submitReview() {
      if (!this.review.comment || !this.review.rating) return;
      this.review.restaurant_id = this.$route.query.restaurant_id || this.$route.params.id || 1;

      await this.postReview(this.review);
      this.resetForm();
    },

    async submitUpdate() {
      if (!this.editId) return;
      await this.updateReview({ id: this.editId, reviewData: this.review });
      this.resetForm();
    },

    async removeReview(id) {
      await this.deleteReview(id);
    },

    editReview(rev) {
      this.review = { ...rev };
      this.isEditing = true;
      this.editId = rev.id;
    },

    cancelEdit() {
      this.resetForm();
    },

    resetForm() {
      this.review = { restaurant_id: null, rating: 5, comment: "" };
      this.isEditing = false;
      this.editId = null;
    },
  },
};
</script>



