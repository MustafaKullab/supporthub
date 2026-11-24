import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    // Login استثناء لمسار
    // لأنه لو المستخدم كتب كلمة مرور خاطئة ورجع 401، ما بدنا نحاول نجدّد الجلسة.
    if(originalRequest?.url?.includes("/auth/login")){
      return Promise.reject(error);
    }

    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // لعدم تكرار التحديث في كل مرّة

      /*
      وليش استعملنا
      axios.post العادي لطلب Refresh،
      api.post مش ؟
      Refresh  حتى طلب الـ
      Interceptor  نفسه ما يدخل في نفس
      لو فشل، ويعمل حلقة تجديد متكررة.
      */

      await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/refresh`,
        {},
        { withCredentials: true },
      );

      // بعد نجاح النحديث اعد تنفيذ الطلب اللي فشل نفسه
      return api(originalRequest);
    }

    return Promise.reject(error);

},
);


export default api;
