<script>
  import { mapGetters } from 'vuex';
  
  export default {
    computed: {
      ...mapGetters(['isAuthenticated', 'usuarioDatos']), // Accedemos a los datos del usuario en el store
    },
    created() {
      this.obtenerUsuarioDatos();
    },
    methods: {
      async obtenerUsuarioDatos() {
        try {
          const email = this.$store.state.usuario?.email; // Usamos el correo guardado en el estado de Vuex
          console.log(this.$store.state.usuario?.email)
          if (email) {
            // Llamamos a la acción de Vuex para buscar el usuario por correo
            const usuario = await this.$store.dispatch('buscarUsuarioPorEmail', email);
            if (usuario) {
              console.log("Usuario encontrado en Firestore:", usuario);
            } else {
              console.log("Usuario no encontrado.");
            }
          } else {
            console.log("No hay un correo registrado.");
          }
        } catch (error) {
          console.error("Error al obtener datos del usuario:", error);
        }
      },
    },
  };
  </script>
  <template>
    <div>
      <h3 v-if="usuarioDatos">Hola, {{ usuarioDatos.nombre }} {{ usuarioDatos.apellido }}</h3>
      <p v-else>No se ha encontrado el usuario.</p>
    </div>
  </template>
  