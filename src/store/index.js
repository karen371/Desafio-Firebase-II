/**NOTA 
 * LINK AL HOSTING FIREBASE
 * https://desadio-firebase2.web.app/
 */
import { createStore } from 'vuex';
import { createUserWithEmailAndPassword, auth } from "@/auth";
import { getFirestore, collection, query, where, getDocs, setDoc, doc } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default createStore({
  state: {
    usuario:null
  },
  getters: {
    isAuthenticated: (state) => !!state.usuario,
    usuarioDatos: (state) => state.usuario,
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
        
        // Registra al usuario con email y contraseña
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
    
        // NO actualizamos el estado de Vuex, para que no se inicie sesión automáticamente
        alert('Usuario registrado correctamente. Por favor inicie sesión.');
    
        // O si deseas, puedes cerrar la sesión del usuario después del registro
        await signOut(auth);  // Cerrar la sesión inmediatamente
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
    },
    async buscarUsuarioPorEmail({ commit }, email) {
      try {
        const db = getFirestore(); // Obtener la referencia a Firestore
        const usuariosRef = collection(db, "usuario"); // Referencia a la colección "usuario"
        
        // Crear la consulta para buscar por correo electrónico
        const q = query(usuariosRef, where("email", "==", email)); // Filtrar por email
        
        // Obtener los resultados de la consulta
        const querySnapshot = await getDocs(q);
        
        if (!querySnapshot.empty) {
          // Si se encuentra un usuario, obtener los datos
          const usuarioDoc = querySnapshot.docs[0];
          const usuarioData = usuarioDoc.data();
          console.log("Usuario encontrado:", usuarioData);
    
          // Puedes guardar el usuario en el estado
          commit('setUsuario', usuarioData); // Si deseas guardar los datos en Vuex
          return usuarioData; // Retorna los datos del usuario
        } else {
          console.log("No se encontró ningún usuario con ese correo electrónico.");
          return null; // Si no se encuentra, devuelve null
        }
      } catch (error) {
        console.error("Error al buscar usuario por email:", error);
        throw new Error("Error al buscar usuario."); // Lanza error si algo sale mal
      }
    },
    verificarUsuario({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // Si hay un usuario autenticado, lo almacenamos en Vuex
          commit('setUsuario', user);
        } else {
          // Si no hay usuario, limpiamos el estado
          commit('clearUsuario');
        }
      });
    },
  },
  modules: {
    // Aquí puedes agregar otros módulos si es necesario
  }
});
