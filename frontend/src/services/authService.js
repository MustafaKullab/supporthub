import api from '@/api/api';

export const login = async (email , password) => {
  const response = await api.post("/auth/login" , {email , password});

  return response?.data?.data?.user;
}

export const signup = async (formData) => {
  const response = await api.post("/auth/signup" , formData);

  return response?.data?.data?.user;
}
