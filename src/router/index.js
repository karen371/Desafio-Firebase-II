import { createRouter, createWebHistory } from 'vue-router';
import { getAuth } from 'firebase/auth';  // Asegúrate de importar Firebase
import SingUpView from '../views/SingUpView.vue';  // Vista de registro
import LoginView from '../views/LoginView.vue';  // Vista de login
import HomeView from '../views/HomeView.vue';    // Vista de Home

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'singup',
      component: SingUpView,
      meta: {
        requiresGuest: true  // Solo accesible para usuarios no autenticados
      }
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
      meta: {
        requiresGuest: true  // Solo accesible para usuarios no autenticados
      }
    },
    {
      path: '/home',
      name: 'home',
      component: HomeView,
      meta: {
        requiresAuth: true  // Solo accesible para usuarios autenticados
      }
    }
  ]
});

// Guardia de ruta global para manejar redirección
router.beforeEach((to, from, next) => {
  const user = getAuth().currentUser; // Obtener el usuario autenticado desde Firebase

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!user) {
      next({ name: 'login' }); // Redirigir a login si no está autenticado
    } else {
      next(); // Continuar si el usuario está autenticado
    }
  }
  // Si la ruta requiere que el usuario no esté autenticado (registro o login)
  else if (to.meta.requiresGuest) {
    if (user) {
      next({ name: 'home' }); // Redirigir al home si el usuario ya está autenticado
    } else {
      next(); // Continuar si no está autenticado
    }
  } else {
    next(); // Para todas las demás rutas, continuar sin restricciones
  }
});

export default router;
