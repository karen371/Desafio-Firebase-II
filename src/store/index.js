import { createStore } from 'vuex';
import { createUserWithEmailAndPassword, auth } from "@/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default createStore({
  state: {
    usuario:null
  },
  getters: {
    isAuthenticated: (state) => !!state.usuario,
  },
  mutations: {
    setUsuario(state,usuario){
      state.usuario = usuario;
    },
    clearUsuario(state){
      state.usuario = null
    }
  },
  actions: {
    //registrar usuarios
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
    },
    //Iniciar sesion
    async singIn(context, userData) {
      try {
        const { email, password } = userData;
        const auth = getAuth();
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        console.log(userCredential.user);
        context.commit('setUsuario',userCredential.user);
      } catch (error) {
        console.log('Error al iniciar sesión:', error.message);
        throw new Error('Error al iniciar sesión');
      }
    },
    //cerrar sesion
    async cerrarSesion({ commit }) {
      const auth = getAuth();
      try {
        await signOut(auth);
        commit('clearUsuario');
        console.log('Sesion cerrada');
        return Promise.resolve(); // Retornamos una promesa exitosa
      } catch (error) {
        console.error('Error al cerrar sesión:', error);
        return Promise.reject(error); // Retornamos la promesa con error
      }
    }

  },
  modules: {
    // Aquí puedes agregar otros módulos si es necesario
  }
});
