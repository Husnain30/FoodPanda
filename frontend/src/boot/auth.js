// src/boot/auth.js
import { boot } from "quasar/wrappers";
import store from "src/store";

export default boot(({ router }) => {
  router.beforeEach((to, from, next) => {
    const isAuth = store.getters["auth/isAuthenticated"];
    const user = store.getters["auth/getUser"];

    // ✅ Public routes (customer-facing like home, restaurants, etc.)
    if (to.path === "/" || to.path.startsWith("/about") || to.path.startsWith("/contact") || to.path.startsWith("/auth")) {
      return next();
    }

    // ✅ Auth required for all role dashboards
    if (!isAuth) {
      return next("/auth/login");
    }

    // ✅ Role-based route guarding
    if (to.path.startsWith("/admin")) {
      if (user?.role !== "admin") return next("/auth/login");
    }

    if (to.path.startsWith("/restaurant")) {
      if (user?.role !== "restaurant") return next("/auth/login");
    }

    if (to.path.startsWith("/rider")) {
      if (user?.role !== "rider") return next("/auth/login");
    }

    if (to.path.startsWith("/orders") || to.path.startsWith("/cart") || to.path.startsWith("/checkout")) {
      if (user?.role !== "customer") return next("/auth/login");
    }

    return next();
  });
});
