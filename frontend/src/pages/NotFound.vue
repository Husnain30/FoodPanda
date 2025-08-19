<template>
  <div class="q-pa-lg flex flex-center column">
    <q-icon name="error_outline" size="80px" color="negative" />
    <h2 class="text-h5 q-mt-md">404 - Page Not Found</h2>
    <p class="text-subtitle2 text-grey-7">
      Sorry, the page you are looking for doesn’t exist.
    </p>
    <q-btn
      to="/"
      color="primary"
      label="Go Back Home"
      class="q-mt-md"
      unelevated
    />
  </div>
</template>


<script>
export default {
  name: "NotFound",
};
</script>
