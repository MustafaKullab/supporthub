import api from '@/api/api';

export const login = async (email , password) => {
  const response = await api.post("/auth/login" , {email , password});

  return response?.data?.data?.user;
}

export const signup = async (formData) => {
  const response = await api.post("/auth/signup" , formData);

  return response?.data?.data?.user;
}

export const getMe = async (employeeId) => {
  const response = await api.get("/auth/me" ,  {params: {employeeId}});

  return response?.data?.data;
}

export const verifyAcc = async (email , code) => {
  const response = await api.post("/auth/verify" , {email , code});

  return response?.data?.success;
}

export const resendCodeSrv = async (email) => {
  const response = await api.post("/auth/resend-verification" , {email});

  return response?.data?.success;
}
