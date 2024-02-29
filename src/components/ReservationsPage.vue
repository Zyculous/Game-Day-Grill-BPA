<script>
export default {
  data() {
    return {
      reservation: {
        name: '',
        date: '',
        time: ''
      }
    }
  },
  methods: {
    submitReservation() {
      // Perform form submission logic here
      console.log('Reservation submitted:', this.reservation)
      // Reset form fields
      this.reservation.name = ''
      this.reservation.date = ''
      this.reservation.time = ''
    }
  }
}
</script>

<template>
  <div class="reservation-page center">
      <form @submit="submitReservation" class="center">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="reservation.name" required />

      <label for="date">Date:</label>
      <input type="date" id="date" v-model="reservation.date" required />

      <label for="time">Time:</label>
      <input type="time" id="time" v-model="reservation.time" required />

      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>

</style>
