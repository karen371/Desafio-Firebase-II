<script>
import { createUserWithEmailAndPassword, auth } from '@/auth';
export default{
  data(){
    return{
      email: '',
      password: ''
    }
  },
  methods:{
    
  }
}
</script>
<template>
    <form class="row g-3">
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