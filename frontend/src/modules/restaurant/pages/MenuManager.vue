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
    />

    <!-- Dishes List -->
    <div class="row q-col-gutter-md">
      <div
        v-for="dish in dishes"
        :key="dish.id"
        class="col-xs-12 col-sm-6 col-md-4"
      >
        <q-card class="dish-card shadow-2">
          <q-img
            :src="dish.imageUrl || 'https://via.placeholder.com/300x200.png?text=Dish+Image'"
            style="height: 180px; border-radius: 12px 12px 0 0;"
          />
          <q-card-section>
            <div class="text-h6">{{ dish.name }}</div>
            <div class="text-subtitle2 text-grey">
              {{ dish.category }} • ${{ dish.price }}
            </div>
            <div class="text-body2 q-mt-sm">{{ dish.description }}</div>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat dense icon="edit" color="primary" @click="openForm(dish)" />
            <q-btn flat dense icon="delete" color="negative" @click="deleteDish(dish.id)" />
          </q-card-actions>
        </q-card>
      </div>
    </div>

    <!-- Add/Edit Form Dialog -->
    <q-dialog v-model="formDialog" persistent>
      <MenuForm :dish="selectedDish" @save="saveDish" @cancel="formDialog=false" />
    </q-dialog>
  </q-page>
</template>

<script>
import MenuForm from "../components/MenuForm.vue";

export default {
  name: "MenuManager",
  components: { MenuForm },
  data() {
    return {
      dishes: [
        {
          id: 1,
          name: "Cheese Burger",
          category: "main",
          price: 5.99,
          description: "Juicy beef patty with cheese and fresh veggies.",
          imageUrl: "https://via.placeholder.com/300x200.png?text=Burger"
        },
        {
          id: 2,
          name: "Chocolate Cake",
          category: "desserts",
          price: 3.5,
          description: "Delicious rich chocolate layered cake.",
          imageUrl: "https://via.placeholder.com/300x200.png?text=Cake"
        }
      ],
      formDialog: false,
      selectedDish: null
    };
  },
  methods: {
    openForm(dish = null) {
      this.selectedDish = dish;
      this.formDialog = true;
    },
    saveDish(dish) {
      if (this.selectedDish) {
        // Update existing
        const idx = this.dishes.findIndex(d => d.id === dish.id);
        this.dishes[idx] = { ...dish, imageUrl: this.previewUrl(dish) };
      } else {
        // Add new
        this.dishes.push({ ...dish, imageUrl: this.previewUrl(dish) });
      }
      this.formDialog = false;
      this.selectedDish = null;
    },
    deleteDish(id) {
      this.dishes = this.dishes.filter(d => d.id !== id);
    },
    previewUrl(dish) {
      if (dish.image instanceof File) {
        return URL.createObjectURL(dish.image);
      }
      return dish.imageUrl || null;
    }
  }
};
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
</style>
