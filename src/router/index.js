import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/RegisterView.vue"),
  },
  {
    path: "/submit-request",
    name: "submit-request",
    component: () => import("../views/LeaveRequestView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log("to", to);
  console.log("from", from);
  if (to.name === "login") {
    next();
  }

  const token = localStorage.getItem("jwt-token");
  console.log("token", token);
  if (!token && to.name !== "login") {
    console.log("token not found");
    return router.push("/login").catch(() => {});
  }
  next();
});

export default router;
