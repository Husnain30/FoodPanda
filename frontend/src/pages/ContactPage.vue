<template>
  <q-page class="contact-page q-pa-xl">
    <div class="container">
      <!-- Header Section -->
      <section class="contact-header text-center q-mb-xl">
        <h1 class="text-h3 text-bold text-primary">Contact Us</h1>
        <p class="text-h6">We'd love to hear from you! Get in touch with us.</p>
      </section>

      <div class="row q-col-gutter-xl">
        <!-- Contact Form -->
        <div class="col-12 col-md-7">
          <q-card class="q-pa-lg">
            <q-card-section>
              <h2 class="text-h5 text-bold q-mb-md">Send us a message</h2>
              
              <q-form @submit="onSubmit" class="q-gutter-md">
                <div class="row q-col-gutter-md">
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="form.name"
                      label="Your Name"
                      outlined
                      required
                      :rules="[val => !!val || 'Name is required']"
                    />
                  </div>
                  <div class="col-12 col-sm-6">
                    <q-input
                      v-model="form.email"
                      label="Email Address"
                      type="email"
                      outlined
                      required
                      :rules="[val => !!val || 'Email is required', val => /.+@.+\..+/.test(val) || 'Invalid email']"
                    />
                  </div>
                </div>

                <q-input
                  v-model="form.subject"
                  label="Subject"
                  outlined
                  required
                  :rules="[val => !!val || 'Subject is required']"
                />

                <q-input
                  v-model="form.message"
                  label="Message"
                  type="textarea"
                  rows="5"
                  outlined
                  required
                  :rules="[val => !!val || 'Message is required']"
                />

                <q-btn 
                  label="Send Message" 
                  type="submit" 
                  color="primary" 
                  class="full-width" 
                  size="lg"
                  :loading="loading"
                />
              </q-form>
            </q-card-section>
          </q-card>
        </div>

        <!-- Contact Information -->
        <div class="col-12 col-md-5">
          <div class="contact-info q-gutter-y-xl">
            <div class="info-item">
              <q-icon name="location_on" size="lg" color="primary" />
              <div class="info-content">
                <h3 class="text-h6 text-bold">Address</h3>
                <p>123 Food Street, Restaurant District<br>City, State 12345</p>
              </div>
            </div>

            <div class="info-item">
              <q-icon name="phone" size="lg" color="primary" />
              <div class="info-content">
                <h3 class="text-h6 text-bold">Phone</h3>
                <p>+1 (555) 123-4567<br>+1 (555) 765-4321</p>
              </div>
            </div>

            <div class="info-item">
              <q-icon name="email" size="lg" color="primary" />
              <div class="info-content">
                <h3 class="text-h6 text-bold">Email</h3>
                <p>info@foodpandaclone.com<br>support@foodpandaclone.com</p>
              </div>
            </div>

            <div class="info-item">
              <q-icon name="schedule" size="lg" color="primary" />
              <div class="info-content">
                <h3 class="text-h6 text-bold">Business Hours</h3>
                <p>Monday - Friday: 9AM - 10PM<br>Saturday - Sunday: 10AM - 11PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Map Section -->
      <section class="map-section q-mt-xl">
        <h2 class="text-h4 text-bold text-center q-mb-md">Find Us</h2>
        <div class="map-placeholder bg-grey-3 rounded-borders text-center q-pa-xl">
          <q-icon name="map" size="xl" color="grey-6" />
          <p class="q-mt-md">Interactive map would be displayed here</p>
        </div>
      </section>
    </div>
  </q-page>
</template>

<script>
import { ref } from 'vue'
import { useQuasar } from 'quasar'

export default {
  name: 'ContactPage',
  setup() {
    const $q = useQuasar()
    const loading = ref(false)
    
    const form = ref({
      name: '',
      email: '',
      subject: '',
      message: ''
    })

    const onSubmit = () => {
      loading.value = true
      
      // Simulate API call
      setTimeout(() => {
        loading.value = false
        $q.notify({
          type: 'positive',
          message: 'Your message has been sent successfully!'
        })
        
        // Reset form
        form.value = {
          name: '',
          email: '',
          subject: '',
          message: ''
        }
      }, 2000)
    }

    return {
      form,
      loading,
      onSubmit
    }
  }
}
</script>

<style scoped>
.contact-page {
  background: #f8f9fa;
}

.info-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.info-content {
  flex: 1;
}

.map-placeholder {
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  .info-item {
    flex-direction: column;
    text-align: center;
    gap: 8px;
  }
}
</style>