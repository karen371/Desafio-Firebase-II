import { createStore } from 'vuex';
import { createUserWithEmailAndPassword, auth } from "@/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default createStore({
  state: {
    usuario: {
      email: '',
      nombre: '',
      password: '',
      apellido: ''
    }
  },
  getters: {
    // Aquí puedes agregar los getters si es necesario
  },
  mutations: {
    ingUsuario(state, usuario) {
      state.usuario = usuario;
    }
  },
  actions: {
    async accionRegistrar(context, usuarioData) {
      try {
        console.log('Datos en Vuex:', usuarioData); // Verifica los datos en Vuex
        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          usuarioData.email, 
          usuarioData.password
        );
        const user = userCredential.user;
        
        // Si deseas agregar datos adicionales del usuario a Firestore
        const db = getFirestore();
        await setDoc(doc(db, "usuario", user.uid), {
          email: user.email,
          nombre: usuarioData.nombre,
          apellido: usuarioData.apellido
        });
        
        alert('Usuario registrado correctamente');
      } catch (error) {
        console.log('Error al registrar:', error.message);
        alert('Error al registrar');
      }
    }
  },
  modules: {
    // Aquí puedes agregar otros módulos si es necesario
  }
});
