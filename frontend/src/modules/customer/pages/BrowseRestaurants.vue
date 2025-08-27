<template>
  <q-page class="browse-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="hero-overlay">
        <div class="hero-content">
          <h1>Find Your Favorite Food</h1>
          <p>Order from the best restaurants near you, anytime, anywhere.</p>
          <q-input
            v-model="search"
            filled
            rounded
            placeholder="Search for restaurants or cuisines..."
            class="search-bar"
          />
        </div>
      </div>
    </section>

    <!-- Cuisines Section -->
    <section class="cuisines">
      <h2>Browse by Cuisines</h2>
      <div class="cuisine-list">
        <div v-for="cuisine in cuisines" :key="cuisine.name" class="cuisine-card">
          <img :src="cuisine.img" alt="Cuisine" class="cuisine-img" />
          <span>{{ cuisine.name }}</span>
        </div>
      </div>
    </section>

    <!-- New on Foodpanda -->
    <section class="new-section">
      <h2>New on Foodpanda</h2>
      <div class="new-grid">
        <div v-for="item in newItems" :key="item.name" class="new-card">
          <img :src="item.img" alt="New Item" class="new-img" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <!-- Featured Restaurants -->
    <section class="featured">
      <h2> Featured Restaurants</h2>
      <div class="featured-grid">
        <RestaurantCard
          v-for="n in 4"
          :key="'featured-' + n"
          :name="'Featured ' + n"
          :cuisine="'Pizza, Burgers, Fast Food'"
          :rating="(4 + Math.random()).toFixed(1)"
        />
      </div>
    </section>

    <!-- All Restaurants -->
    <section class="all-restaurants">
      <h2> All Restaurants</h2>
      <div class="restaurant-grid">
        <RestaurantCard
          v-for="n in 7"
          :key="'all-' + n"
          :name="'Restaurant ' + n"
          :cuisine="'Italian, Fast Food'"
          :rating="(4 + Math.random()).toFixed(1)"
        />
      </div>
    </section>
  </q-page>
</template>

<script>
import RestaurantCard from "../components/RestaurantCard.vue";

export default {
  name: "BrowseRestaurants",
  components: { RestaurantCard },
  data() {
    return {
      search: "",
      cuisines: [
        { name: "Italian", img: "/images/italian.jpg" },
        { name: "Chinese", img: "/images/chinease.jpg" },
        { name: "Mexican", img: "/images/mexican.jpg" }, 
        { name: "Indian", img: "/images/indian.jpg" },
      ],
      newItems: [
        { name: "Vegan Bowl", desc: "Healthy & Fresh", img: "/images/bowl.jpg" },
        { name: "Bubble Tea", desc: "Refreshing Drink", img: "/images/tea.jpg" },
        { name: "Grilled Sandwich", desc: "Crispy & Tasty", img: "/images/fish.jpg" },
      ],
    };
  },
};
</script>

<style scoped>
/* Hero Section with Background Image */
.hero {
  background: url('/images/foodpic.jpg') center/cover no-repeat;
  position: relative;
  height: 687px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  overflow: hidden;

}
.hero-overlay {
  background: rgba(0, 0, 0, 0.55);
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hero-content {
  text-align: center;
  color: #fff;
  padding: 20px;
}
.hero h1 {
  font-size: 48px;
  font-weight: 800;
  text-shadow: 0px 4px 10px rgba(0,0,0,0.3);
}
.hero p {
  font-size: 20px;
  margin: 10px 0 20px;
}
.search-bar {
  max-width: 550px;
  margin: 0 auto;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 4px 12px rgba(0,0,0,0.2);
}

/* Section Headings */
section h2 {
  margin: 30px 0 25px;
  font-size: 28px;
  font-weight: 700;
  color: #333;
  position: relative;
}
section h2::after {
  content: "";
  width: 60px;
  height: 4px;
  background: #ff2b85;
  display: block;
  margin-top: 8px;
  border-radius: 2px;
}

/* Cuisines */
.cuisines {
  margin: 0 25px;
}
.cuisine-list {
  display: flex;
  gap: 20px;
  overflow-x: auto;
  padding-bottom: 10px;
}
.cuisine-card {
  min-width: 160px;
  text-align: center;
  background: #fff;
  border-radius: 18px;
  padding: 20px 15px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}
.cuisine-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 10px 22px rgba(0,0,0,0.2);
}
.cuisine-img {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 14px;
  border: 3px solid #ff2b85;
}
.cuisine-card span {
  font-weight: 700;
  color: #333;
  font-size: 16px;
}

/* New Section */
.new-section {  
  margin: 0 25px;
}
.new-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 28px;
}
.new-card {
  background: #fff;
  border-radius: 18px;
  padding: 20px 15px;
  text-align: center;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
  transition: all 0.3s ease-in-out;
}
.new-card:hover {
  transform: translateY(-8px) scale(1.03);
  box-shadow: 0 10px 22px rgba(0,0,0,0.2);
}
.new-img {
  width: 100%;
  height: 160px;
  object-fit: cover;
  border-radius: 14px;
  margin-bottom: 14px;
}
.new-card h3 {
  margin-bottom: 8px;
  font-size: 20px;
  font-weight: 700;
  color: #333;
}
.new-card p {
  font-size: 15px;
  color: #777;
}

/* Featured & All Restaurants */
.featured,
.all-restaurants {
  margin: 0 25px;
}

.featured-grid,
.restaurant-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 28px;
}
</style>



