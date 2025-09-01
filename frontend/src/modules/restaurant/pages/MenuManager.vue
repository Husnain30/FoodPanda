<template>
  <q-page class="q-pa-md">
    <div class="text-h5 text-primary q-mb-md">📋 Menu Manager</div>

    <!-- Add Dish Button -->
    <q-btn
      label="Add New Dish"
      color="primary"
      icon="add"
      @click="openForm()"
      class="q-mb-md"
      :loading="loading"
    />

    <!-- Loading State -->
    <div v-if="loading && menuItems.length === 0" class="flex flex-center q-pa-xl">
      <q-spinner-dots size="50px" color="primary" />
    </div>

    <!-- Error State -->
    <div v-if="error" class="q-pa-md">
      <q-banner inline-actions class="text-white bg-negative">
        <template v-slot:avatar>
          <q-icon name="error" />
        </template>
        {{ error }}
        <template v-slot:action>
          <q-btn flat label="Retry" @click="loadMenuItems" />
        </template>
      </q-banner>
    </div>

    <!-- Empty State -->
    <div v-if="!loading && !error && menuItems.length === 0" class="text-center q-pa-xl">
      <q-icon name="restaurant_menu" size="64px" color="grey-5" />
      <div class="text-h6 text-grey-6 q-mt-md">No menu items yet</div>
      <div class="text-body2 text-grey-5 q-mb-md">Start by adding your first dish</div>
      <q-btn color="primary" label="Add First Dish" @click="openForm()" />
    </div>

    <!-- Dishes List -->
    <div v-if="menuItems.length > 0" class="row q-col-gutter-md">
      <div
        v-for="dish in menuItems"
        :key="dish.id"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-card class="dish-card shadow-2">
          <q-img
            :src="dish.image_url || dish.imageUrl || 'https://via.placeholder.com/300x200.png?text=Dish+Image'"
            style="height: 180px; border-radius: 12px 12px 0 0;"
            loading="lazy"
          />
          <q-card-section>
            <div class="text-h6">{{ dish.name }}</div>
            <div class="text-subtitle2 text-grey">
              {{ dish.category }} • ${{ dish.price }}
            </div>
            <div class="text-body2 q-mt-sm">{{ dish.description }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn 
              flat 
              dense 
              icon="edit" 
              color="primary" 
              @click="openForm(dish)" 
              :loading="dish.updating"
            />
            <q-btn 
              flat 
              dense 
              icon="delete" 
              color="negative" 
              @click="confirmDelete(dish)" 
              :loading="dish.deleting"
            />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Form Dialog -->
    <q-dialog v-model="formDialog" persistent>
      <MenuForm 
        :dish="selectedDish" 
        :loading="formLoading"
        @save="saveDish" 
        @cancel="closeForm" 
      />
    </q-dialog>

    <!-- Delete Confirmation Dialog -->
    <q-dialog v-model="deleteDialog" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar icon="warning" color="negative" text-color="white" />
          <span class="q-ml-sm">
            Are you sure you want to delete "{{ dishToDelete?.name }}"?
          </span>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn 
            flat 
            label="Delete" 
            color="negative" 
            @click="deleteDish"
            :loading="deleteLoading"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useQuasar } from 'quasar'
import MenuForm from '../components/MenuForm.vue'

export default {
  name: 'MenuManager',
  components: { MenuForm },
  setup() {
    const store = useStore()
    const $q = useQuasar()

    // Reactive data
    const formDialog = ref(false)
    const deleteDialog = ref(false)
    const selectedDish = ref(null)
    const dishToDelete = ref(null)
    const formLoading = ref(false)
    const deleteLoading = ref(false)

    // Computed properties
  const menuItems = computed(() => store.getters['restaurant/getMenuItems'] || [])
const loading = computed(() => store.getters['restaurant/getMenuLoading'] || false)
const error = computed(() => store.getters['restaurant/getMenuError'] || null)

    // Get restaurant ID from localStorage or user data

// Replace your getRestaurantId function with this improved version:
const getRestaurantId = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    const restaurantId = user.restaurant_id || user.id
    
    if (!restaurantId) {
      console.warn('No restaurant ID found in user data')
      $q.notify({
        color: 'warning',
        message: 'Restaurant ID not found. Please login again.',
        icon: 'warning'
      })
      return null
    }
    
    return restaurantId
  } catch (error) {
    console.error('Error parsing user data:', error)
    return null
  }
}

    // Methods
 // Replace your loadMenuItems function with this:
const loadMenuItems = async () => {
  try {
    const restaurantId = getRestaurantId()
    if (!restaurantId) {
      return // Exit if no restaurant ID
    }
    
    await store.dispatch('restaurant/fetchMenuItems', restaurantId)
  } catch (error) {
    console.error('Error loading menu items:', error)
    $q.notify({
      color: 'negative',
      message: 'Failed to load menu items',
      icon: 'error'
    })
  }
}


    const openForm = (dish = null) => {
      selectedDish.value = dish
      formDialog.value = true
    }

    const closeForm = () => {
      formDialog.value = false
      selectedDish.value = null
      formLoading.value = false
    }

   // Replace your saveDish function with this debug version:
const saveDish = async (formData) => {
  console.log('saveDish called with:', formData) // Debug log
  formLoading.value = true
  
  try {
    if (selectedDish.value) {
      // Update existing dish
      console.log('Updating dish:', selectedDish.value.id) // Debug log
      await store.dispatch('restaurant/updateMenuItemWithImage', {
        itemId: selectedDish.value.id,
        formData
      })
      
      $q.notify({
        color: 'positive',
        message: 'Dish updated successfully',
        icon: 'check'
      })
    } else {
      // Add new dish
      console.log('Adding new dish') // Debug log
      await store.dispatch('restaurant/addMenuItemWithImage', formData)
      
      $q.notify({
        color: 'positive',
        message: 'Dish added successfully',
        icon: 'check'
      })
    }
    
    closeForm()
  } catch (error) {
    console.error('Error in saveDish:', error) // Debug log
    $q.notify({
      color: 'negative',
      message: error.message || 'Failed to save dish',
      icon: 'error'
    })
  } finally {
    formLoading.value = false
  }
}

    const confirmDelete = (dish) => {
      dishToDelete.value = dish
      deleteDialog.value = true
    }

    const deleteDish = async () => {
      if (!dishToDelete.value) return

      deleteLoading.value = true
      
      try {
        await store.dispatch('restaurant/deleteMenuItem', dishToDelete.value.id)
        
        $q.notify({
          color: 'positive',
          message: 'Dish deleted successfully',
          icon: 'check'
        })
        
        deleteDialog.value = false
        dishToDelete.value = null
      } catch (error) {
        $q.notify({
          color: 'negative',
          message: error.message || 'Failed to delete dish',
          icon: 'error'
        })
      } finally {
        deleteLoading.value = false
      }
    }

    // Lifecycle
   onMounted(() => {
  // Debug: Check if store has restaurant module
  console.log('Store modules:', Object.keys(store._modules.root._children))
  console.log('Restaurant module exists:', !!store._modules.root._children.restaurant)
  
  if (store._modules.root._children.restaurant) {
    console.log('Restaurant actions:', Object.keys(store._modules.root._children.restaurant._rawModule.actions))
  }
  
  loadMenuItems()
})

    return {
      // Data
      formDialog,
      deleteDialog,
      selectedDish,
      dishToDelete,
      formLoading,
      deleteLoading,
      
      // Computed
      menuItems,
      loading,
      error,
      
      // Methods
      loadMenuItems,
      openForm,
      closeForm,
      saveDish,
      confirmDelete,
      deleteDish
    }
  }
}
</script>

<style scoped>
.dish-card {
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.dish-card:hover {
  transform: scale(1.03);
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
}

.q-banner {
  border-radius: 8px;
}
</style>