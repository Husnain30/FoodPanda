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

<!-- MenuForm.vue - Fix this file -->
<script>
import { ref, computed, watch } from 'vue'

export default {
  name: 'MenuForm',
  props: {
    dish: Object,
    loading: Boolean
  },
  emits: ['save', 'cancel'],
  setup(props, { emit }) {
    // Form data
    const form = ref({
      name: '',
      description: '',
      price: 0,
      category: '',
      restaurant_id: '',
      image: null
    })
    
    const preview = ref(null)
    
    // Categories for select dropdown
    const categories = ref([
      { label: 'Appetizer', value: 'appetizer' },
      { label: 'Main Course', value: 'main_course' },
      { label: 'Dessert', value: 'dessert' },
      { label: 'Beverages', value: 'beverages' },
      { label: 'Pakistani', value: 'pakistani' },
      { label: 'Chinese', value: 'chinese' },
      { label: 'Italian', value: 'italian' }
    ])

    // Computed properties
    const isEdit = computed(() => !!props.dish)
    const isFormValid = computed(() => 
      form.value.name && form.value.category && form.value.price > 0
    )

    // Get restaurant ID from localStorage
    const getRestaurantId = () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const restaurantId = user.restaurant_id || user.id
        console.log('Form: Using restaurant ID:', restaurantId)
        return restaurantId
      } catch (error) {
        console.error('Error getting restaurant ID:', error)
        return null
      }
    }

    // Watch for dish changes (edit mode)
    watch(() => props.dish, (dish) => {
      const restaurantId = getRestaurantId()
      
      if (dish) {
        // Edit mode - populate form with existing data
        form.value = {
          name: dish.name || '',
          description: dish.description || '',
          price: dish.price || 0,
          category: dish.category || '',
          restaurant_id: restaurantId,
          image: null // Don't pre-populate image for edit
        }
        preview.value = dish.image_url || dish.imageUrl || null
        console.log('Form populated for edit:', form.value)
      } else {
        // Add mode - reset form
        form.value = {
          name: '',
          description: '',
          price: 0,
          category: '',
          restaurant_id: restaurantId,
          image: null
        }
        preview.value = null
        console.log('Form reset for new dish:', form.value)
      }
    }, { immediate: true })

    // Image preview method
    const previewImage = (file) => {
      if (file) {
        const reader = new FileReader()
        reader.onload = (e) => {
          preview.value = e.target.result
        }
        reader.readAsDataURL(file)
        console.log('Image selected for preview:', file.name)
      } else {
        // If file is cleared, show existing image (edit mode) or null (add mode)
        preview.value = props.dish?.image_url || props.dish?.imageUrl || null
      }
    }

    // Submit handler
    const handleSubmit = () => {
      if (!isFormValid.value) {
        return
      }

      console.log('Form submitted:', form.value)
      
      // Create FormData object
      const formData = new FormData()
      
      // Add all form fields
      formData.append('name', form.value.name)
      formData.append('description', form.value.description || '')
      formData.append('price', form.value.price)
      formData.append('category', form.value.category)
      formData.append('restaurant_id', form.value.restaurant_id)
      
      // Add image if selected
      if (form.value.image) {
        formData.append('image', form.value.image)
        console.log('Image added to FormData:', form.value.image.name)
      }

      // Debug FormData contents
      console.log('FormData being sent:')
      for (let pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1])
      }
      
      emit('save', formData)
    }

    return {
      // Data
      form,
      preview,
      categories,
      
      // Computed
      isEdit,
      isFormValid,
      
      // Methods
      previewImage,
      handleSubmit
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