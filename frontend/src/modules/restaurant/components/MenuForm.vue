<template>
  <q-card class="menu-form-card q-pa-lg shadow-4">
    <q-card-section>
      <div class="text-h6 text-primary text-center">
        {{ isEdit ? "Update Dish" : "Add New Dish" }}
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
        step="0.01"
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

      <!-- Restaurant ID (hidden, auto-populated) -->
      <q-input
        v-model="form.restaurant_id"
        type="hidden"
        style="display: none;"
      />

      <!-- Image Upload -->
      <q-file
        v-model="form.image"
        label="Upload Image"
        outlined
        dense
        accept="image/*"
        clearable
        @update:model-value="previewImage"
      >
        <template v-slot:prepend>
          <q-icon name="attach_file" />
        </template>
      </q-file>

      <!-- Image Preview -->
      <div v-if="preview" class="q-mt-md flex flex-center">
        <q-img 
          :src="preview" 
          style="max-width: 200px; max-height: 150px; border-radius: 12px;" 
          fit="cover"
        >
          <div class="absolute-bottom text-subtitle2 text-center">
            Image Preview
          </div>
        </q-img>
      </div>

      <!-- Buttons -->
      <div class="row q-col-gutter-sm q-mt-md justify-end">
        <q-btn 
          label="Cancel" 
          flat 
          color="negative" 
          @click="$emit('cancel')"
          :disable="loading"
        />
        <q-btn 
          :label="isEdit ? 'Update Dish' : 'Add Dish'" 
          type="submit" 
          color="primary"
          :loading="loading"
          :disable="!isFormValid"
        />
      </div>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: 'MenuForm',
  props: {
    dish: {
      type: Object,
      default: null
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  emits: ['save', 'cancel'],
  data() {
    return {
      categories: [
        { label: 'Starters', value: 'starters' },
        { label: 'Main Course', value: 'main' },
        { label: 'Desserts', value: 'desserts' },
        { label: 'Drinks', value: 'drinks' },
        { label: 'Fast Food', value: 'fast_food' },
        { label: 'Traditional', value: 'traditional' }
      ],
      form: {
        name: '',
        category: '',
        price: null,
        description: '',
        restaurant_id: null,
        image: null
      },
      preview: null
    }
  },
  computed: {
    isEdit() {
      return !!this.dish
    },
    isFormValid() {
      return !!(
        this.form.name?.trim() &&
        this.form.category &&
        this.form.price > 0
      )
    }
  },
  watch: {
    dish: {
      handler(newDish) {
        if (newDish) {
          this.loadDishData(newDish)
        } else {
          this.resetForm()
        }
      },
      immediate: true
    }
  },
  mounted() {
    this.setRestaurantId()
    if (this.dish) {
      this.loadDishData(this.dish)
    }
  },
  methods: {
    setRestaurantId() {
      // Get restaurant ID from user data
      const user = JSON.parse(localStorage.getItem('user') || '{}')
      this.form.restaurant_id = user.restaurant_id || user.id || 1
    },

    loadDishData(dish) {
      this.form = {
        name: dish.name || '',
        category: dish.category || '',
        price: dish.price || null,
        description: dish.description || '',
        restaurant_id: dish.restaurant_id || this.form.restaurant_id,
        image: null // Don't pre-populate file input
      }
      
      // Set preview from existing image
      this.preview = dish.image_url || dish.imageUrl || null
    },

    handleSubmit() {
  if (!this.isFormValid) return

  // Create FormData for API submission
  const formData = new FormData()
  
  // Add all form fields to FormData
  formData.append('name', this.form.name.trim())
  formData.append('category', this.form.category)
  formData.append('price', this.form.price)
  formData.append('restaurant_id', this.form.restaurant_id)
  
  if (this.form.description) {
    formData.append('description', this.form.description.trim())
  }
  
  if (this.form.image) {
    formData.append('image', this.form.image)
  }

  this.$emit('save', formData)
},
    previewImage(file) {
      if (file && file instanceof File) {
        // Create preview URL for the selected file
        const reader = new FileReader()
        reader.onload = (e) => {
          this.preview = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        // Clear preview if no file selected
        if (!this.dish?.image_url && !this.dish?.imageUrl) {
          this.preview = null
        }
      }
    },

    resetForm() {
      this.form = {
        name: '',
        category: '',
        price: null,
        description: '',
        restaurant_id: this.form.restaurant_id,
        image: null
      }
      this.preview = null
    }
  }
}
</script>

<style scoped>
.menu-form-card {
  border-radius: 20px;
  background: linear-gradient(145deg, #ffffff, #f5f5f5);
  transition: all 0.3s ease-in-out;
  min-width: 400px;
  max-width: 500px;
}

.menu-form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0px 8px 20px rgba(0,0,0,0.1);
}

.q-img {
  border: 2px dashed #e0e0e0;
}
</style>