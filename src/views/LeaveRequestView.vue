<template>
  <div class="leave-form">
    <h2>Submit Leave Request</h2>
    <form @submit.prevent="submitLeaveRequest">
      <label for="leaveDate">Leave Date:</label>
      <input type="date" v-model="leaveRequest.leave_date" required />

      <label for="duration">Duration (days):</label>
      <input type="number" v-model="leaveRequest.leave_duration" required />

      <label for="reason">Reason:</label>
      <textarea v-model="leaveRequest.reason" required></textarea>

      <button type="submit">Submit Request</button>
    </form>
  </div>
</template>

<script>
import axios from "@/axios";
import router from "@/router";

export default {
  data() {
    return {
      leaveRequest: {
        leave_date: "",
        leave_duration: null,
        reason: "",
      },
    };
  },
  methods: {
    async submitLeaveRequest() {
      try {
        console.log(this.leaveRequest);
        await axios.post(
          "http://localhost:8000/leave-request/send",
          this.leaveRequest
        );
        alert("Leave request submitted successfully!");

        this.leaveRequest = {
          leave_date: "",
          leave_duration: null,
          reason: "",
        };
        await router.push({ path: "/" });
      } catch (error) {
        console.error("Error submitting leave request:", error.message);
      }
    },
  },
};
</script>

<style>
.leave-form {
  max-width: 400px;
  margin: auto;
}

form {
  display: grid;
  gap: 10px;
}

label {
  font-weight: bold;
}

textarea {
  height: 80px;
}
</style>
