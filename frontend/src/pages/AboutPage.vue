<template>
  <q-page class="about-page q-pa-xl">
    <div class="container">
      <!-- Header Section -->
      <section class="about-header text-center q-mb-xl">
        <h1 class="text-h3 text-bold text-primary q-mb-md">About FoodPanda Clone</h1>
        <p class="text-h6">Delivering happiness to your doorstep since 2023</p>
      </section>

      <!-- Mission Section -->
      <section class="mission-section q-my-xl">
        <div class="row items-center">
          <div class="col-12 col-md-6">
            <h2 class="text-h4 text-bold q-mb-md">Our Mission</h2>
            <p class="text-body1">
              We connect hungry customers with the best local restaurants in their area. 
              Our mission is to make food delivery fast, convenient, and delightful for everyone.
            </p>
            <p class="text-body1">
              Whether you're craving pizza, sushi, burgers, or something healthy, 
              we've got you covered with hundreds of restaurants to choose from.
            </p>
          </div>
          <div class="col-12 col-md-6 text-center">
            <q-img
              src="https://images.unsplash.com/photo-1467003909585-2f8a72700288?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZvb2QlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60"
              alt="Food Delivery"
              class="rounded-borders"
              style="max-width: 400px;"
            />
          </div>
        </div>
      </section>

      <!-- Values Section -->
      <section class="values-section q-my-xl">
        <h2 class="text-h4 text-bold text-center q-mb-xl">Our Values</h2>
        
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-4 text-center">
            <q-icon name="local_shipping" size="xl" color="primary" class="value-icon" />
            <h3 class="text-h6 q-mt-md">Fast Delivery</h3>
            <p class="text-body2">We ensure your food arrives hot and fresh, always on time.</p>
          </div>
          
          <div class="col-12 col-md-4 text-center">
            <q-icon name="restaurant" size="xl" color="primary" class="value-icon" />
            <h3 class="text-h6 q-mt-md">Quality Food</h3>
            <p class="text-body2">Partnering with the best restaurants to bring you delicious meals.</p>
          </div>
          
          <div class="col-12 col-md-4 text-center">
            <q-icon name="support_agent" size="xl" color="primary" class="value-icon" />
            <h3 class="text-h6 q-mt-md">24/7 Support</h3>
            <p class="text-body2">Our customer support team is always here to help you.</p>
          </div>
        </div>
      </section>

      <!-- Team Section -->
      <section class="team-section q-my-xl">
        <h2 class="text-h4 text-bold text-center q-mb-xl">Our Team</h2>
        
        <div class="row q-col-gutter-xl justify-center">
          <div class="col-12 col-sm-6 col-md-3 text-center" v-for="member in team" :key="member.name">
            <q-avatar size="100px" class="q-mb-md">
              <img :src="member.avatar" :alt="member.name">
            </q-avatar>
            <h3 class="text-h6">{{ member.name }}</h3>
            <p class="text-caption text-grey">{{ member.position }}</p>
          </div>
        </div>
      </section>

      <!-- Stats Section -->
      <section class="stats-section text-center q-my-xl bg-primary text-white q-pa-xl rounded-borders">
        <div class="row justify-around">
          <div class="col-6 col-md-3" v-for="stat in stats" :key="stat.label">
            <div class="text-h3 text-bold">{{ stat.value }}+</div>
            <div class="text-h6">{{ stat.label }}</div>
          </div>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'AboutPage',
  setup() {
    const team = ref([
      {
        name: 'John Doe',
        position: 'CEO & Founder',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Jane Smith',
        position: 'Head of Operations',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Mike Johnson',
        position: 'CTO',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Sarah Wilson',
        position: 'Head of Marketing',
        avatar: 'https://images.unsplash.com/photo-1554151228-14d9def656e4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHBlb3BsZXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
      }
    ])

    const stats = ref([
      { value: '500', label: 'Restaurants' },
      { value: '50K', label: 'Customers' },
      { value: '100K', label: 'Deliveries' },
      { value: '20', label: 'Cities' }
    ])

    return {
      team,
      stats
    }
  }
}
</script>

<style scoped>
.about-page {
  background: #f8f9fa;
}

.value-icon {
  background: #f0f0f0;
  padding: 20px;
  border-radius: 50%;
}

.stats-section {
  background: linear-gradient(135deg, #ff4081 0%, #ff9800 100%);
}
</style>