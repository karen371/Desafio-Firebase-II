<script>
import Navbar from './Navbar.vue';
export default {
  props: {
    title: {
      type: String,
      required: true
    }
  },
  components: {
    Navbar
  }
}
</script>

<template>
  <header class="d-flex flex-column mb-3 justify-content-center w-100">
    <div class="d-flex flex-column mb-3 justify-content-center w-100">
      <Navbar/>
      <h1 class="text-center">{{ title }}</h1>
    </div>
  </header>
</template>

<style scoped>
  header{
    background-color: aquamarine;
  }
</style>

