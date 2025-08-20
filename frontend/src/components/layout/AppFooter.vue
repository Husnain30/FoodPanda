<template>
  <footer class="bg-dark text-white">
    <div class="footer-content q-pa-xl">
      <div class="container">
        <div class="row q-col-gutter-xl">
          <!-- Company Info -->
          <div class="col-12 col-md-4">
            <div class="footer-logo q-mb-md">
              <!-- Using a placeholder image to avoid path errors -->
              <div class="logo-placeholder bg-primary text-white flex flex-center rounded-borders" style="width: 40px; height: 40px;">
                <q-icon name="restaurant" size="24px" />
              </div>
              <span class="text-h6 text-bold q-ml-sm">FoodPanda Clone</span>
            </div>
            <p class="text-body2">
              Delivering delicious food to your doorstep. Order from your favorite restaurants with just a few clicks.
            </p>
            <div class="social-links q-mt-md">
              <q-btn round color="white" text-color="dark" icon="facebook" class="q-mr-sm" />
              <q-btn round color="white" text-color="dark" icon="twitter" class="q-mr-sm" />
              <q-btn round color="white" text-color="dark" icon="instagram" class="q-mr-sm" />
              <q-btn round color="white" text-color="dark" icon="linkedin" />
            </div>
          </div>

          <!-- Quick Links -->
          <div class="col-6 col-md-2">
            <h5 class="text-h6 text-bold q-mb-md">Quick Links</h5>
            <q-list dense>
              <q-item clickable v-ripple @click="$router.push('/')">
                <q-item-section>Home</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="$router.push('/about')">
                <q-item-section>About Us</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="$router.push('/contact')">
                <q-item-section>Contact</q-item-section>
              </q-item>
              <q-item clickable v-ripple @click="$router.push('/restaurants')">
                <q-item-section>Restaurants</q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Services -->
          <div class="col-6 col-md-2">
            <h5 class="text-h6 text-bold q-mb-md">Services</h5>
            <q-list dense>
              <q-item>
                <q-item-section>Food Delivery</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Takeaway</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Group Orders</q-item-section>
              </q-item>
              <q-item>
                <q-item-section>Catering</q-item-section>
              </q-item>
            </q-list>
          </div>

          <!-- Newsletter -->
          <div class="col-12 col-md-4">
            <h5 class="text-h6 text-bold q-mb-md">Newsletter</h5>
            <p class="text-body2">Subscribe to get special offers and discount coupons.</p>
            <q-input
              v-model="email"
              placeholder="Your email address"
              outlined
              dense
              class="q-mb-sm"
              bg-color="white"
            >
              <template v-slot:append>
                <q-btn round dense icon="send" color="primary" @click="subscribeNewsletter" />
              </template>
            </q-input>
            <p v-if="subscriptionMessage" class="text-caption text-positive">{{ subscriptionMessage }}</p>
          </div>
        </div>

        <!-- Copyright -->
        <q-separator color="grey-7" class="q-my-lg" />
        <div class="row items-center justify-between">
          <div class="col-12 col-md-6 text-center text-md-left">
            <p class="text-caption">&copy; 2023 FoodPanda Clone. All rights reserved.</p>
          </div>
          <div class="col-12 col-md-6 text-center text-md-right q-gutter-xs">
            <q-btn flat dense label="Privacy Policy" class="text-caption" />
            <q-btn flat dense label="Terms of Service" class="text-caption" />
            <q-btn flat dense label="Cookie Policy" class="text-caption" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'MainFooter',
  setup() {
    const $q = useQuasar()
    const email = ref('')
    const subscriptionMessage = ref('')

    const subscribeNewsletter = () => {
      if (!email.value) {
        $q.notify({
          type: 'warning',
          message: 'Please enter your email address'
        })
        return
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        $q.notify({
          type: 'negative',
          message: 'Please enter a valid email address'
        })
        return
      }

      // Simulate subscription
      subscriptionMessage.value = 'Thank you for subscribing!'
      $q.notify({
        type: 'positive',
        message: 'Successfully subscribed to newsletter!'
      })
      
      // Clear email after subscription
      email.value = ''
      
      // Clear message after 3 seconds
      setTimeout(() => {
        subscriptionMessage.value = ''
      }, 3000)
    }

    return {
      email,
      subscriptionMessage,
      subscribeNewsletter
    }
  }
}
</script>

<style scoped>
footer {
  background: #1a1a1a;
  width: 100%;
}

.footer-logo {
  display: flex;
  align-items: center;
}

.social-links .q-btn {
  transition: transform 0.3s ease;
}

.social-links .q-btn:hover {
  transform: scale(1.1);
}

.logo-placeholder {
  min-width: 40px;
  min-height: 40px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .footer-content {
    padding: 24px 16px;
  }
  
  .footer-logo {
    justify-content: center;
    text-align: center;
    flex-direction: column;
    gap: 8px;
  }
  
  .footer-logo .q-ml-sm {
    margin-left: 0 !important;
  }
  
  .social-links {
    justify-content: center;
  }
}
</style>