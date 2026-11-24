<template>
  <section class="LoginPage min-vh-100">
    <div class="container min-vh-100 d-flex align-items-center justify-content-center">
      <div
        class="LoginCard row w-100 align-items-center justify-content-center bg-white rounded-4 shadow-sm"
      >
        <div class="col-lg-6 p-0">
          <div class="detailsSide text-center px-5" style="height: 100%">
            <div class="logo">
              <img
                :src="logo"
                class="img-fluid"
                style="width: 200px"
                alt="Logo"
              />
            </div>

            <div class="welcomeMsg">
              <h2 class="fw-bold m-0">مرحبا بعودتك</h2>
              <p class="fs-5 fw-bold" style="color: var(--secondary-color)">
                سجّل الدخول الى حسابك في SupportHub
              </p>
            </div>

            <form @submit.prevent="loginUser(user)">
              <div class="mb-2 text-start email">
                <label for="email" class="form-label fw-bold">البريد الالكتروني</label>

                <div class="input-group has-validation">
                  <span
                    class="input-group-text border-end-0 rounded-0"
                    :class="userError ? 'is-invalid' : ''"
                    style="background-color: transparent"
                    ><i class="bi bi-envelope"></i
                  ></span>
                  <input
                    type="email"
                    style="direction: rtl"
                    class="form-control"
                    :class="userError ? 'is-invalid' : ''"
                    placeholder="أدخل بريدك الالكتروني"
                    aria-label="Email"
                    id="email"
                    aria-describedby="email"
                    v-model="user.email"
                  />
                </div>
              </div>
              <div class="mb-2 text-start password">
                <label for="password" class="form-label fw-bold">كلمة المرور</label>

                <div class="input-group position-relative has-validation">
                  <span
                    class="input-group-text"
                    :class="userError ? 'is-invalid' : ''"
                    style="background-color: transparent"
                    ><i class="bi bi-lock"></i
                  ></span>
                  <button
                    type="button"
                    class="eyeBtn position-absolute top-50 cursor-pointer btn"
                    :class="userError ? 'is-invalid' : ''"
                    style="left: 0; transform: translateY(-50%); z-index: 10"
                    @click.prevent="isHide = !isHide"
                  >
                    <i class="bi" :class="isHide ? 'bi-eye-slash' : 'bi-eye'"></i>
                  </button>
                  <input
                    :type="isHide ? 'password' : 'text'"
                    class="form-control"
                    :class="userError ? 'is-invalid' : ''"
                    placeholder="أدخل كلمة المرور"
                    aria-label="Password"
                    id="password"
                    aria-describedby="password"
                    v-model="user.password"
                  />
                </div>
              </div>

              <transition name="fade" mode="out-in">
                <div
                  class="errorMessage my-0 d-flex align-items-center text-start gap-3 py-1 px-3 rounded"
                  style="color: #b91c1c; background-color: #fee2e2"
                  v-if="userError"
                >
                  <div class="icon" style="color: #dc2626">
                    <i class="bi bi-exclamation-triangle fs-4"></i>
                  </div>
                  <div class="text">
                    <h5 class="m-0">فشل تسجيل الدخول</h5>
                    <p class="m-0 fw-bold" style="font-size: 12px">
                      {{ userError }}
                    </p>
                  </div>
                </div>
              </transition>

              <div class="forgotPass text-end mt-2">
                <router-link
                  :to="{ name: 'ForgotPassword' }"
                  class="text-primary cursor-pointer btn px-0"
                  style="border: none"
                  >هل نسيت كلمة المرور؟</router-link
                >
              </div>

              <div class="buttons my-2">
                <div class="loginBtn">
                  <button
                    class="btn py-2 w-100 text-light fs-5"
                    style="background-color: #0d4dc1"
                    type="submit"
                    :disabled="isLoading"
                  >
                    <div v-if="isLoading">جاري تسجيل الدخول...</div>
                    <div v-else class="d-flex align-items-center justify-content-center gap-3">
                      <div class="text">تسجيل الدخول</div>
                      <div class="icon" style="margin-top: 2px">
                        <i class="bi bi-box-arrow-left"></i>
                      </div>
                    </div>
                  </button>
                </div>

                <div class="haveAccMsg mt-2">
                  <p class="fs-6">ليس لديك حساب ؟</p>
                </div>
                <div class="signupBtn my-0">
                  <router-link
                    :to="{ name: 'Signup' }"
                    class="btn btn-outline-primary py-2 w-100 d-flex align-items-center justify-content-center gap-3 fs-5"
                    ><div class="text">إنشاء حساب جديد</div></router-link
                  >
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-6 p-0 d-none d-lg-block">
          <div class="imgSide p-5 text-light rounded-end-4" style="height: 600px">
            <h2 class="mb-3">منصة الدعم الداخلي للموظفين</h2>
            <p class="fs-5">
              قدِّم طلبات الدعم، وتابِع حالتها، وتواصَل مع فريق <br />
              تقنية المعلومات بكلِّ سهولة وفعّالية.
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { toast } from 'vue-sonner'
import router from '@/router'
import logo from '@/assets/supportHubLogo.png';


// Define auth store
const authStore = useAuthStore();

// isHide var to hide and visible password
const isHide = ref(true)

// user obj to send user information
const user = ref({ email: '', password: '' })

// Var to store loading state
const isLoading = ref(false)

// var to store error
const userError = ref('')

watch(
  user,
  () => {
    userError.value = ''
  },
  { deep: true },
)

// بدل م نحطهم كلهم بالكاتش فصلناهم
const getLoginErrorMessage = (error) => {
  // No response from server
  if (!error.response) {
    return 'تعذّر الاتصال بالخادم. تحقق من اتصالك بالإنترنت.'
  }

  const status = error.response.status

  if (status === 401 || status === 404) {
    return 'البريد الإلكتروني أو كلمة المرور غير صحيحة.'
  }

  if (status === 429) {
    return 'محاولات كثيرة. يرجى المحاولة لاحقاً.'
  }

  if (status >= 500) {
    return 'حدث خطأ في الخادم. يرجى المحاولة لاحقاً.'
  }

  return 'تعذّر تسجيل الدخول. يرجى المحاولة مرة أخرى.'
}

// Function to login user
const loginUser = async (user) => {
  try {
    if (isLoading.value) return

    isLoading.value = true

    await authStore.login(user.email, user.password)

    // Success message
    toast.success('تم تسجيل الدخول بنجاح', {})

    router.push({ name: 'Signup' })
  } catch (error) {
    userError.value = getLoginErrorMessage(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<style lang="scss">
.LoginCard {
  min-height: 600px;
  .imgSide {
    background-image: url('@/assets/loginImg.png');
    background-size: cover;
    background-position: center;
  }
}

.forgotPass {
  a {
    transition: 0.3s;
    &:hover {
      color: #0047e0 !important;
    }
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

.buttons {
  .loginBtn {
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

  .signupBtn {
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

.has-validation {
  > span {
    border-top-right-radius: 4px !important;
    border-bottom-right-radius: 4px !important;
  }

  .is-invalid {
    border: 1px solid #dc2626;
    background-color: #fee2e2;
  }
}
</style>
