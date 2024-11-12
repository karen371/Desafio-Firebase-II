<script>
export default {
  computed: {
    isAuthenticated() {
      // Obtenemos el estado de autenticación desde Vuex
      return this.$store.getters.isAuthenticated;
    }
  },
  methods: {
    cerrarSesion() {
        this.$store.dispatch('cerrarSesion')
        .then(() => {
          this.$router.push('/');
        })
        .catch(error => {
          console.error('Error al cerrar sesión:', error);
          alert('Hubo un error al cerrar la sesión');
        });
    }
  }
};
</script>
<template>
    <nav class="navbar navbar-expand-lg bg-primary w-100">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Navbar</a>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li v-if="!isAuthenticated">
                        <router-link to="/" class="nav-link">Registrarse</router-link>
                    </li>
                    <li v-if="!isAuthenticated">
                        <router-link to="/login" class="nav-link">Iniciar Sesión</router-link>
                    </li>
                    <!-- Mostrar "Home" y "Cerrar Sesión" solo si el usuario está autenticado -->
                    <li v-if="isAuthenticated">
                        <router-link to="/home" class="nav-link">Home</router-link>
                    </li>
                    <li v-if="isAuthenticated">
                        <router-link to="/" @click="cerrarSesion" class="nav-link">Cerrar Sesión</router-link>
                    </li>
                </ul>
            </div>   
        </div>
    </nav>
</template>
<style scoped>
    .navbar{
        width: 100%;
    }
</style>
