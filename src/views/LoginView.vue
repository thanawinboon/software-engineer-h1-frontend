<template>
  <div id="app">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="username">Username:</label>
      <input type="text" v-model="username" required />

      <label for="password">Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit">Login</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from "axios";
import instance from "@/axios";
import router from "@/router";
export default {
  data() {
    return {
      username: "",
      password: "",
      error: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios
          .create()
          .post("http://localhost:8000/auth/login", {
            username: this.username,
            password: this.password,
          });

        localStorage.setItem("jwt-token", response.data.token);
        localStorage.setItem("username", this.username);
        instance.defaults.headers.common["Authorization"] =
          "Bearer " + response.data.token;
        alert("Login successful!");
        await router.push({ path: "/" });
      } catch (error) {
        this.error = "An error occurred during login. Please try again.";
        console.error("Error:", error);
      }
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

form {
  display: inline-block;
  text-align: left;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

button {
  background-color: #3498db;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.error {
  color: red;
  margin-top: 10px;
}
</style>
