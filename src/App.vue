<script>
import { RouterLink, RouterView } from 'vue-router'
import Header from './components/Header.vue'

export default {
  components: {
    Header
  },
  computed: {
    pageTitle() {
      // Puedes ajustar esto según tus rutas
      if (this.$route.name === 'singup') {
        return 'Sing Up';
      } else if (this.$route.name === 'login') {
        return 'Inicio de Sesión';
      } else if (this.$route.name === 'home') {
        return 'Bienvenido';
      }else{
        return 'pagina x';
      }
    }
  }
}
</script>


<template>
  <Header :title="pageTitle"/>
  <RouterView />
</template>

<style scoped>

</style>
