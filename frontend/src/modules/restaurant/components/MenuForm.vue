<template>
  <q-card class="menu-form-card q-pa-lg shadow-4">
    <q-card-section>
      <div class="text-h6 text-primary text-center">
        🍽️ {{ isEdit ? "Update Dish" : "Add New Dish" }}
      </div>
    </q-card-section>

    <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
      <!-- Dish Name -->
      <q-input
        v-model="form.name"
        label="Dish Name"
        outlined
        dense
        clearable
        :rules="[val => !!val || 'Dish name is required']"
      />

      <!-- Category -->
      <q-select
        v-model="form.category"
        :options="categories"
        label="Category"
        outlined
        dense
        emit-value
        map-options
        :rules="[val => !!val || 'Select a category']"
      />

      <!-- Price -->
      <q-input
        v-model.number="form.price"
        label="Price ($)"
        outlined
        dense
        type="number"
        prefix="$"
        :rules="[val => val > 0 || 'Enter valid price']"
      />

      <!-- Description -->
      <q-input
        v-model="form.description"
        label="Description"
        type="textarea"
        outlined
        autogrow
        dense
      />

      <!-- Image Upload -->
      <q-file
        v-model="form.image"
        label="Upload Image"
        outlined
        dense
        accept="image/*"
        clearable
        @change="previewImage"
      />

      <!-- Image Preview -->
      <div v-if="preview" class="q-mt-md flex flex-center">
        <q-img :src="preview" style="max-width: 200px; border-radius: 12px;" />
      </div>

      <!-- Buttons -->
      <div class="row q-col-gutter-sm q-mt-md justify-end">
        <q-btn label="Cancel" flat color="negative" @click="$emit('cancel')" />
        <q-btn :label="isEdit ? 'Update Dish' : 'Add Dish'" type="submit" color="primary" />
      </div>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: "MenuForm",
  props: {
    dish: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      categories: [
        { label: "Starters", value: "starters" },
        { label: "Main Course", value: "main" },
        { label: "Desserts", value: "desserts" },
        { label: "Drinks", value: "drinks" }
      ],
      form: {
        name: "",
        category: "",
        price: null,
        description: "",
        image: null
      },
      preview: null
    };
  },
  computed: {
    isEdit() {
      return !!this.dish;
    }
  },
  mounted() {
    if (this.dish) {
      this.form = { ...this.dish };
      if (this.dish.imageUrl) {
        this.preview = this.dish.imageUrl;
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit("save", { ...this.form, id: this.dish?.id || Date.now() });
      this.resetForm();
    },
    previewImage(e) {
      if (e && e.target && e.target.files && e.target.files[0]) {
        this.preview = URL.createObjectURL(e.target.files[0]);
      }
    },
    resetForm() {
      this.form = {
        name: "",
        category: "",
        price: null,
        description: "",
        image: null
      };
      this.preview = null;
    }
  }
};
</script>

<style scoped>
.menu-form-card {
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  transition: all 0.3s ease-in-out;
}
.menu-form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
}
</style>
