<template>
  <section class="signUp min-vh-100">

    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div class="signupCard row w-100 bg-white rounded-4 my-3 shadow-sm">
        <div class="col-lg-6 col-xl-5 p-0 d-none d-lg-block" style="min-height: 600px !important;">

          <div class="imgSide text-light p-3 d-flex flex-column justify-content-between" style="height: 100%;">
            <div class="msgTxt">
              <h2>ابدأ رحلتك في SupportHub</h2>
              <p>أنشئ حسابك بسهولة للوصول الى خدمات <br /> الدعم الفني ومتابعة طلباتك بأي وقت.</p>
            </div>
            <div class="whyBox p-2 px-4 rounded-4" style="background-color: rgba(255, 255, 255, .12); backdrop-filter: blur(10px); border: 1px solid #6c94e0;">
              <div class="title mb-2 fs-5 fw-bold">لماذا تنشئ حساباً؟</div>
              <div class="d-flex align-items-center">
                <div class=" text-center ">


                    <div class="mx-auto icon bg-white rounded text-dark d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><i class="bi bi-shield-check fs-4"></i></div>
                    <div class="msg">طلب الدعم بسرعة وسهولة</div>
                </div>
                <div class="vr mx-2 my-auto" style="height: 50px;"></div>
                <div class=" text-center flex-grow-1" style="width: 35%;">


                    <div class="mx-auto icon bg-white rounded text-dark d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><i class="bi bi-shield-check fs-4"></i></div>
                    <div class="msg">متابعة حالة طلباتك</div>
                </div>
                <div class="vr mx-2 my-auto" style="height: 50px;"></div>
                <div class=" text-center ">


                    <div class="mx-auto icon bg-white rounded text-dark d-flex align-items-center justify-content-center" style="width: 40px; height: 40px;"><i class="bi bi-shield-check fs-4"></i></div>
                    <div class="msg">دعم تقني موثوق لجميع الموظفين</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-6 col-xl-7 px-5">

          <div class="details text-center">
            <div class="header">

              <div class="logo">
                <img :src="logo"
              class="img-fluid"
              style="width: 200px"
              alt="logo">
            </div>
            <div class="mainTitle"><h1 class="fw-bold m-0">إنشاء حساب جديد</h1></div>
            <div class="secondaryTitle fs-5 fw-bold" style="color: var(--secondary-color);">انضم الى منصة الدعم الداخلي وابدأ باستخدام خدماتها</div>
          </div>

          <form @submit.prevent="signupUser(user)">

            <div class="mb-2 text-start email">
                <label for="name" class="form-label fw-bold">الاسم الكامل</label>

                <div class="input-group has-validation">
                  <span
                    class="input-group-text border-end-0 rounded-0" :class="invalidFields['name'] ? 'is-invalid' : ''"
                    style="background-color: transparent; border-top-right-radius: 5px !important; border-bottom-right-radius: 5px !important;"
                    ><i class="bi bi-person "></i
                  ></span>
                  <input
                    type="text"
                    style="direction: rtl"
                    class="form-control" :class="invalidFields['name'] ? 'is-invalid' : ''"
                    placeholder="أدخل اسمك الكامل"
                    aria-label="Name"
                    id="name"
                    aria-describedby="name"
                    v-model="user.name"
                  />
                </div>
            </div>

            <div class="mb-2 text-start email">
                <label for="email" class="form-label fw-bold">البريد الإلكتروني</label>

                <div class="input-group has-validation">
                  <span
                    class="input-group-text border-end-0 rounded-0"
                    style="background-color: transparent; border-top-right-radius: 5px !important; border-bottom-right-radius: 5px !important;"
                    ><i class="bi bi-envelope"></i
                  ></span>
                  <input
                    type="email"
                    style="direction: rtl"
                    class="form-control"
                    placeholder="أدخل بريدك الإلكتروني"
                    aria-label="Email"
                    id="email"
                    aria-describedby="email"
                    v-model="user.email"
                  />
                </div>
            </div>

            <div class="d-flex align-items-center gap-md-2 gap-lg-0 gap-xl-2 flex-wrap">
              <div class="mb-2 text-start password flex-grow-1">
                <label for="password" class="form-label fw-bold">كلمة المرور</label>

                <div class="input-group position-relative has-validation">
                  <span
                    class="input-group-text"
                    style="background-color: transparent"
                    ><i class="bi bi-lock"></i
                  ></span>
                  <button
                    type="button"
                    class="eyeBtn position-absolute top-50 cursor-pointer btn"
                    style="left: 0; transform: translateY(-50%); z-index: 10"
                    @click.prevent="isHide1 = !isHide1"
                  >
                    <i class="bi" :class="isHide1 ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                  <input
                  :type="isHide1 ? 'password' : 'text'"
                    class="form-control"
                    placeholder="أدخل كلمة المرور"
                    aria-label="Password"
                    id="password"
                    aria-describedby="password"
                    v-model="user.password"
                  />
                </div>
              </div>
              <div class="mb-2 text-start password flex-grow-1">
                <label for="confPassword" class="form-label fw-bold">تأكيد كلمة المرور</label>

                <div class="input-group position-relative has-validation">
                  <span
                    class="input-group-text"
                    style="background-color: transparent"
                    ><i class="bi bi-lock"></i
                  ></span>
                  <button
                    type="button"
                    class="eyeBtn position-absolute top-50 cursor-pointer btn"
                    style="left: 0; transform: translateY(-50%); z-index: 10"
                    @click.prevent="isHide2 = !isHide2"
                  >
                    <i class="bi" :class="isHide2 ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                  <input
                  :type="isHide2 ? 'password' : 'text'"
                    class="form-control"
                    placeholder="أعد إدخال كلمة المرور"
                    aria-label="confPassword"
                    id="confPassword"
                    aria-describedby="confPassword"
                    v-model="user.confirmPassword"
                  />
                </div>
              </div>
            </div>

            <div class="avatar">
              <input type="file" class="d-none" ref="uploadAvatar">
              <div class="title text-start d-flex align-items-center gap-2 mb-2"><div class="fw-bold">الصورة الشخصية</div> <span style="color: var(--secondary-color);">(اختيارية)</span></div>
              <div class="chooseArea d-flex align-items-center justify-content-evenly p-2 rounded cursor-pointer" @click.prevent="openChooseFile">
                <div class="icon position-relative rounded-pill d-flex align-items-center justify-content-center" style="width: 60px; height: 60px; background-color: #ebeef9;">
                  <i class="bi bi-person-fill avatar-icon fs-1" style="color: #a4b7dd;"></i>
                  <span class="add-icon position-absolute text-light d-flex align-items-center justify-content-center rounded-pill" style="right: 0; bottom: 0; width: 20px; height: 20px; background-color: #0145d3;">
                    <i class="bi bi-plus-lg"></i>
                  </span>
                </div>
                <div class="text">
                  <div class="d-flex align-items-center gap-2 fw-bold" style="color: #3369e1;"><div class="text">اختر صورة شخصية</div><div class="icon"><i class="bi bi-cloud-arrow-up fs-3"></i></div></div>
                  <div class="desc small fw-bold" style="color: var(--secondary-color);">(بحد أقصى 2MB)</div>
                </div>
              </div>
            </div>
            <div class="buttons my-2">
                <div class="signupBtn">
                  <button
                    class="btn w-100 text-light fs-5"
                    style="background-color: #0d4dc1"
                    type="submit"
                    :disabled="isLoading"
                  >
                    <div v-if="isLoading">جاري إنشاء الحساب...</div>
                    <div v-else class="d-flex align-items-center justify-content-center gap-3">
                      <div class="text">إنشاء الحساب</div>
                      <div class="icon" style="margin-top: 2px">
                        <i class="bi bi-person-add fs-4"></i>
                      </div>
                    </div>
                  </button>
                </div>

                <div class="haveAccMsg mt-2">
                  <p class="fs-6">لديك حساب بالفعل ؟</p>
                </div>
                <div class="loginBtn my-0">
                  <router-link
                    :to="{ name: 'Login' }"
                    class="btn btn-outline-primary py-2 w-100 d-flex align-items-center justify-content-center gap-3 fs-5"
                    ><div class="text">تسجيل الدخول</div></router-link
                  >
                </div>
              </div>

          </form>

        </div>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import logo from '@/assets/supportHubLogo.png';
import { ref } from 'vue';
import * as authService from '@/services/authService';
import { toast } from 'vue-sonner';

// Define two var to visible ar hidden pass
const isHide1 = ref(true);
const isHide2 = ref(true);

// Define var to store input file element
const uploadAvatar = ref(null);

// Function to open choose screen
const openChooseFile = () => {
  uploadAvatar.value.showPicker();
}

// define Obj to store user information
const user = ref({
  name: "",
  email: '',
  password: '',
  confirmPassword: '',
});

// Define is loading var
const isLoading = ref(false);

// Var to store the error
const errorMessage = ref("");

const invalidFields = ref({});

// Function to handle with errors
const getSignupErrorMessage = (error) => {
  if(!error?.response){
    return "تعذّر الاتصال بالخادم. تحقق من الإنترنت.";
  }

  const status = error?.response?.status;

  if(status === 400 || status === 422){
    return "يرجى مراجعة البيانات المدخلة وتصحيح الحقول المحددة.";
  }

  if(status === 409){
    return "بعض بيانات الحساب مستخدمة مسبقاً، يرجى مراجعتها.";
  }

  if(status === 413){
    return "حجم الصورة أكبر من المسموح.";
  }

  if(status === 415){
    return "نوع ملف الصورة غير مدعوم.";
  }

  if(status === 429){
    return "محاولات كثيرة، يرجى المحاولة لاحقاً.";
  }

  if(status === 503){
    return "فشل ارسال كود التأكيد الى حِسابك , حاول مرة أخرى لاحقاً .";
  }
  if(status >= 500){
    return "حدث خطأ في الخادم، يرجى المحاولة لاحقاً.";
  }
  return "تعذّر إنشاء الحساب، يرجى المحاولة مجدداً.";
}

// Function to signup user
const signupUser = async (user) => {
  if(!user.name || !user.email || !user.password || !user.confirmPassword)
    return toast.error("يرجى ادخال المعلومات المطلوبة");

  if(user.password !== user.confirmPassword)
    return toast.error("كلمتي المرور غير مُـتطابقتين.");

  const formData = new FormData();
  formData.append("name" , user.name);
  formData.append("email" , user.email);
  formData.append("password" , user.password);
  if(uploadAvatar?.value?.files?.[0]){
    formData.append("avatar" , uploadAvatar.value.files[0]);
  }

  try {
    if(isLoading.value) return;

    isLoading.value = true;
    await authService.signup(formData);

    toast.success("تم إنشاء حِسابك بِنَجاح.")

  } catch(error){

    console.log(error?.response?.data);

    errorMessage.value = getSignupErrorMessage(error);

    toast.error(errorMessage.value);

  } finally{

    isLoading.value = false;
  }
}

</script>

<style lang="scss">
.signupCard{
  min-height: 600px;
  .imgSide{
    background-image: url('@/assets/signupImg.png');
    background-position: bottom;
    background-size: cover;
    border-top-right-radius: 1rem;
    border-bottom-right-radius: 1rem;
  }
}

.eyeBtn {
  &:focus {
    border: none !important;
  }
  &.is-invalid {
    left: 25px !important;
    border: none !important;
    background-color: transparent !important;
  }
}

.avatar{
  .chooseArea{
    border: 2px dashed #ccc;
    transition: .3s;
    i.bi-person-fill{
      transition: .3s;
    }
    &:hover{
      border-color: #0345b8 !important;
      animation: chooseAv .6s linear infinite;
      i.bi-person-fill{
        color: #0345b8 !important;
      }
    }

  }
}

.buttons {
  .signupBtn {
    button {
      &:hover {
        background-color: #0345b8 !important;
      }
    }
  }

  .haveAccMsg {
    position: relative;
    color: var(--secondary-color);
    &::before,
    &::after {
      content: '';
      position: absolute;
      top: 53%;
      transform: translateY(-50%);
      height: 1px;
      width: 38%;
      background-color: #e0e4ec;
    }

    &::before {
      left: 0;
    }
    &::after {
      right: 0;
    }
  }

  .loginBtn {
    a {
      color: #0d4dc1;
      border-color: #0d4dc1;
      &:hover {
        background-color: #0d4dc1 !important;
        color: white !important;
      }
    }
  }
}

@keyframes chooseAv {
  0%{
    border-style: dotted ;
  }
  50%{
    border-style: dashed;
  }
  100%{
    border-style: dotted;
  }
}
</style>
