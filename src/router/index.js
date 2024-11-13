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

router.beforeEach((to, from, next) => {
  const auth = getAuth();
  const user = auth.currentUser; // Usuario autenticado (si existe)
  console.log(user);
  // Si la ruta requiere autenticación (requiresAuth)
  if (to.meta.requiresAuth) {
    if (!user) {
      // Si el usuario no está autenticado, redirigir a login
      next({ name: 'login' });
    } else {
      // Si el usuario está autenticado, permitir la navegación
      next();
    }
  }
  // Si la ruta requiere que el usuario NO esté autenticado (requiresGuest)
  else if (to.meta.requiresGuest) {
    if (user) {
      // Si el usuario ya está autenticado, redirigir a home
      next({ name: 'home' });
    } else {
      // Si el usuario NO está autenticado, permitir la navegación
      next();
    }
  } else {
    // Si la ruta no tiene ninguna de las dos condiciones, permitir la navegación
    next();
  }
});

export default router;
