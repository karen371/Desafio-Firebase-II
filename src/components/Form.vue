<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      nombre: '',
      apellido: ''
    };
  },
  methods: {
    registrarUsuario() {
      // Llamamos a la acción de Vuex para registrar el usuario
      const usuarioData = {
      email: this.email,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido
    };
      this.$store.dispatch('accionRegistrar',usuarioData);
      this.nombre = "";
      this.password = "";
      this.email = "";
      this.apellido = "";
    }
  },
  watch: {
    // Opcional: Si necesitas hacer algo cuando los valores cambien
  }
};
</script>
<template>
  <form @submit.prevent="registrarUsuario" class="row g-3">
    <div class="col-md-6">
      <label for="inputEmail4" class="form-label">Email</label>
      <input v-model="email" type="email" class="form-control" id="inputEmail4" required>
    </div>
    <div class="col-md-6">
      <label for="inputPassword4" class="form-label">Contraseña</label>
      <input v-model="password" type="password" class="form-control" id="inputPassword4" required>
    </div>
    <div class="col-md-6">
      <label for="inputname" class="form-label">Nombre</label>
      <input v-model="nombre" type="text" class="form-control" id="inputname" placeholder="Nombre" required>
    </div>
    <div class="col-md-6">
      <label for="inputApellido" class="form-label">Apellido</label>
      <input v-model="apellido" type="text" class="form-control" id="inputApellido" placeholder="Apellido" required>
    </div>
    <div class="col-12">
      <button type="submit" class="btn btn-primary">Registrarse</button>
    </div>
  </form>
</template>

