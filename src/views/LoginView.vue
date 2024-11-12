<script>
import Login from '@/components/Login.vue';
export default {
  components:{
    Login
  }
}
</script>
<template>
  <section class="d-flex justify-content-center mt-4">
    <div class="mx-5 contenedor ">
      <Login/>
    </div>
  </section>

</template>

<style scoped>
  .contenedor{
    width: 70%;
  }
</style>
