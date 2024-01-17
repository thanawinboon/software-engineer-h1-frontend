<template>
  <div id="app">
    <h1>Leave Requests</h1>
    <div class="leave-container">
      <div
        v-for="(request, index) in leaveRequests"
        :key="index"
        class="leave-box"
      >
        <strong>Leave Date:</strong> {{ request.leave_date }}<br />
        <strong>Duration:</strong> {{ request.leave_duration }} day(s)<br />
        <strong>Reason:</strong> {{ request.reason }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  data() {
    return {
      leaveRequests: [],
    };
  },
  mounted() {
    this.fetchLeaveRequests();
  },
  methods: {
    async fetchLeaveRequests() {
      try {
        const response = await axios
          .create()
          .get("http://localhost:8000/leave-request/list");
        this.leaveRequests = response.data;
      } catch (error) {
        console.error("Error fetching leave requests:", error.message);
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

.leave-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.leave-box {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
}
</style>
