<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const userData = {
        email: this.email,
        password: this.password
      };
      // Llamamos a la acción 'singIn' y pasamos el objeto con los datos del usuario
      this.$store.dispatch('singIn', userData)
        .then(() => {
          // Si el inicio de sesión es exitoso, redirige a la página de inicio
          this.$router.push('/home');
          console.log('Inicio de sesión exitoso');
        })
        .catch((error) => {
          console.log('Error:', error);
          alert('Error al iniciar sesión');
        });
    }
  }
};
</script>

<template>
    <form @submit.prevent="login" class="row g-3">
        <div class="col-12">
          <label for="staticEmail2" class="form-label">Email</label>
          <input v-model="email" type="email" class="form-control" id="staticEmail2" placeholder="Email">
        </div>
      
        <div class="col-12">
          <label for="inputPassword2" class="form-label">Password</label>
          <input v-model="password" type="password" class="form-control" id="inputPassword2" placeholder="Password">
        </div>
      
        <div class="col-12">
          <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
        </div>
    </form>
</template>