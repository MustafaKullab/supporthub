import { defineStore } from "pinia";
import { ref } from "vue";
import * as authService from '@/services/authService';

export const useAuthStore = defineStore('auth' , () => {

  // state
  const user = ref(null);

  // getters => computed


  // actions => functions
  const login = async (email , password) => {
    user.value = await authService.login(email , password);
  };

  return {user , login};
});
